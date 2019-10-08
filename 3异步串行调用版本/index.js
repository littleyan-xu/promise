const fs = require('fs')
const path = require('path')
const Promise = require('./promise.js')

const fileName = path.join(path.resolve(),'/promise/file')

let p = new Promise(function(resolve, reject) {
    fs.readFile(fileName+'/1.txt','utf8',function (err, data) {
        err ? reject(err) : resolve(data)
    })
})

let f1 = function (data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName+'/2.txt','utf8',function (err, data) {
            err ? reject(err) : resolve(data)
        })
    })
}

let f2 = function (data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName+'/3.txt','utf8',function (err, data) {
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

p.then(f1).then(f2).then(f3).catch(errorLog)
