const Promise = require('./promise.js.js')

let p = new Promise((resolve, reject)=> {
    let data = 123
    if(data){
        // 模拟异步操作
        setTimeout(() => {
            resolve(data) 
        }, 300);
    } 
    else reject(data)
})

p.then((data)=>{
    console.log('data:',data);
}).then((data)=>{
    console.log('data2:',data);
})