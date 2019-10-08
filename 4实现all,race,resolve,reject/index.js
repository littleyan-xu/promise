const fs = require('fs')
const path = require('path')
const Promise = require('./promise.js')

const fileName = path.join(path.resolve(),'/promise/file')

let p1 = new Promise(function(resolve, reject) {
    fs.readFile(fileName+'/1.txt','utf8',function (err, data) {
        err ? reject(err) : resolve(data)
    })
})

let p2 = new Promise(function (resolve, reject) {
    fs.readFile(fileName+'/2.txt','utf8',function (err, data) {
        err ? reject(err) : resolve(data)
    })
})

// Promise.all([p1,p2]).then((datas) => {
//     console.log('datas:' , datas);
// })

Promise.race([p1,p2]).then((data) => {
    console.log('data1:' , data);
})

Promise.resolve(12345).then((value) => {
    console.log('number is :', value);
})

