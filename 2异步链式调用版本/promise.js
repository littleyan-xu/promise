const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
    constructor(executor){
        this.value = null
        this.error = null
        this.status = PENDING
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            // 只能从pending改为resolve或者reject，一旦改变不能再次改变
            if(this.status === PENDING){
                this.status = FULFILLED
                this.value = value
                this.onFulfilledCallbacks.forEach(fn=>fn())
            }
        }

        let reject = (error) => {
            // 只能从pending改为resolve或者reject，一旦改变不能再次改变
            if(this.status === PENDING){
                this.status = REJECTED
                this.error = error
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected){
        // 防止没有传值时下面的代码报错
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : error => error

        if(this.status === FULFILLED){
            onFulfilled(this.value)
        }
        else if(this.status === REJECTED){
            onRejected(this.error)
        }
        else{
            this.onFulfilledCallbacks.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.error)
            })
        }
        return this //支持链式调用
    }

    catch(onRejected){
        return this.then(null, onRejected)
    }
}

module.exports = Promise