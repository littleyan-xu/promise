const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
    constructor(executor){
        this.value = null
        this.error = null
        this.status = PENDING

        let resolve = (value) => {
            // 只能从pending改为resolve或者reject，一旦改变不能再次改变
            if(this.status === PENDING){
                this.status = FULFILLED
                this.value = value
            }
        }

        let reject = (error) => {
            // 只能从pending改为resolve或者reject，一旦改变不能再次改变
            if(this.status === PENDING){
                this.status = REJECTED
                this.error = error
            }
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected){
        
        if(this.status === FULFILLED){
            onFulfilled(this.value)
        }
        else if(this.status === REJECTED){
            onRejected(this.error)
        }
    }
}

module.exports = Promise