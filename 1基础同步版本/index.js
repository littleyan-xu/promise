const Promise = require('./promise.js.js')

let p = new Promise((resolve, reject)=> {
    let data = 123
    if(data) resolve(data)
    else reject(data)
})

p.then((data)=>{
    console.log('data:',data);
})