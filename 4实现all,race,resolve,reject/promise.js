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
            // onFulfilled(this.value)
            return new Promise((resolve, reject)=>{
                try {
                    let x = onFulfilled(this.value)
                    resolvePromise(x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
                
            })
        }
        else if(this.status === REJECTED){
            // onRejected(this.error)
            return new Promise((resolve, reject)=>{
                try {
                    let x = onRejected(this.error)
                    resolvePromise(x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        else{
            
            // this.onFulfilledCallbacks.push(()=>{
            //     onFulfilled(this.value)
            // })
            // this.onRejectedCallbacks.push(()=>{
            //     onRejected(this.error)
            // })

            return new Promise((resolve, reject)=>{
                try {
                    this.onFulfilledCallbacks.push(()=>{
                        let x = onFulfilled(this.value)
                        resolvePromise(x, resolve, reject)
                    })
                    this.onRejectedCallbacks.push(()=>{
                        let x = onRejected(this.error)
                        resolvePromise(x, resolve, reject)
                    })
                } catch (error) {
                    reject(error)
                }
                
            })
        }
    }

    catch(onRejected){
        return this.then(null, onRejected)
    }

    static all(promises){
        let result = []
        return new Promise((resolve, reject) => {
            promises.forEach((p) => {
                p.then((value)=>{
                    result.push(value) 
                    if(result.length === promises.length) resolve(result)
                },(error)=>{
                    reject(error)
                })
            })
            // console.log('result.length',result.length);
            // if(result.length === promises.length) resolve(result) // 判断不能放在这里，因为then是异步操作，这里length为0
        })
    }

    static race(promises){
        return new Promise((resolve, reject) => {
            promises.forEach((p) => {
                p.then((value)=>{
                    resolve(value) // 只要有一个fulfilled，就resolve
                },(error)=>{
                    reject(error)
                })
            })
        })
    }

    static resolve(value){
        return new Promise((resolve, reject)=>{
            resolve(value)
        })
    }

    static reject(error){
        return new Promise((resolve, reject)=>{
            reject(error)
        })
    }
}


function resolvePromise(x, resolve, reject) {
    if(x instanceof Promise){
        if(x.status === PENDING){
            x.then((value) =>{
                resolvePromise(value, resolve, reject)
            },(error)=>{
                reject(error)
            })
        }
        else{
            x.then(resolve, reject)
        }
    }
    else{
        resolve(x)
    }
}

module.exports = Promise