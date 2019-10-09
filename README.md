>Promise是ES6新增的异步解决方案， 它的出现极大改善了异步编程环境，本项目为自己造轮子篇，自己造轮子，才能深刻理解其原理和设计思想！参考文档[https://github.com/JOE-XIE/MyWheel/tree/master/MyPromise：](https://github.com/JOE-XIE/MyWheel/tree/master/MyPromise)

### 1、同步基础版本
主要实现在构造器函数里resolve一个的值，在then的回调函数里取到相应的值，并设置状态只能从pending变为resolved或rejected，一旦改变不会再次改变。这里的值的设置是同步的，即resolve值的时候，值已经存在，后面then的时候值直接获取。

### 2、异步链式调用版本
将resolve改为异步调用，即then调用时值还没有获取到。这里用到了订阅发布模式，即在then的时候订阅，在resolve时发布，获取到异步返回的值，并在then的最后返回this，类似于jquery，以便链式调用。


### 3、异步串行调用版本
将then的回调函数也改为异步的Promise，并串行调用，这时then就不能直接返回this，不然后面的每个串行调用都获取的是第一个Promise实例，这时then需要返回一个新的Promise实例，在这个Promise构造器函数里面判断当前需要resolve的值是否也是一个Promise实例，如果是，则需要resolve这个promise实例then得到的值，如果不是，则直接resolv当前值，这样就保证了串行调用时每个then都是获取到的上一个Promise resolve的值。并在这个过程中一旦出现错误，直接reject。

### 4、实现all,race,resolve,reject
给Promise类添加一系列的静态方法，在静态方法里通过实例化当前类来实现一系列的功能。