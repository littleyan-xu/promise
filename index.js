const fs = require('fs')
const Promise = require('./promise.js')

let p = new Promise(function(resolve, reject) {
    fs.readFile(__dirname + '/file/1.txt','utf8',function (err, data) {
        err ? reject(err) : resolve(data)
    })
})

let f1 = function (data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + '/file/2.txt','utf8',function (err, data) {
            err ? reject(err) : resolve(data)
        })
    })
}

let f2 = function (data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + '/file/3.txt','utf8',function (err, data) {
            err ? reject(err) : resolve(data)
        })
    })
}

let f3 = function (data) {
    console.log(data);
}

let errorLog = function (error) {
    console.log('error:', error);
}

p.then(f1).then(f2).then(f3).then((value)=>{
    console.log('last value:', value)
}).catch(errorLog)


// p.then(function (data) {
//     setTimeout(() => {
//         console.log('async data:',data); 
//     }, 100);
// },function (error) {
//     console.log('error',error);
// })