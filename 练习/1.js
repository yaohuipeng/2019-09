

function myInstanceof(temp, classN) {
    var left = temp.__proto__,
        right = classN.prototype
    if (typeof temp !== 'Object' && typeof temp !== 'function') return false
    while (left) {
        if (left === right) return true
        left = left.__proto__
    }
    return false
}

function myInstanceof(temp, classN) {
    // temp的某一次的  __proto__  和  classN 的prototype 相等了； 那就要返回true
    if (typeof temp !== 'object' && typeof temp !== 'function') {
        return false;
    }
    var left = temp.__proto__,
        right = classN.prototype;
    while (left) {
        if (left === right) {
            return true
        }
        left = left.__proto__;
    }
    return false;
}


//myNew
function myNew(...arg) {
    //       Person,name,age
    var obj = {};
    var Constructor = arg.shift();
    obj.__proto__ = Constructor.prototype;
    let res = Constructor.apply(obj, arg);
    return typeof res === 'object' ? res : obj;
}

function myNew(classN, ...arg) {
    var obj = new Object();
    obj.__proto__ = classN.prototype;
    var res = classN.call(obj, ...arg)
    return typeof res === 'object' ? res : obj;
}

// 实现一个 myApply 的方法 ；功能等同于  apply
Function.prototype.myApply = function myApply(context, arg) { // ... 剩余运算符
    arg = arg || [];
    context = context || window;
    let a = Symbol(); // 产生一个唯一的不会重复的值
    context[a] = this;
    let res = context[a](...arg);
    delete context[a];
    return res;
}

// 自己实现一个myCall方法   用法等同于  call;
Function.prototype.myCall = function myCall(context, ...arg) { // ... 剩余运算符
    // this --->  fn
    // this(...arg) // 扩展运算符
    // 让 fn（this） 执行 并且让 函数中的this是context;
    // context.qqq()  qqq执行时 里边的this是 context
    // context.qqq = this;//  context.qqq ---> fn
    // context.qqq(...arg);// 让 fn执行了
    // delete context.qqq;// 删除增加的属性
    context = context || window;
    let a = Symbol(); // 产生一个唯一的不会重复的值
    context[a] = this;
    let res = context[a](...arg);
    delete context[a];
    return res;
}

// 实现一个myBind  用法等同于 bind;
Function.prototype.myBind = function (context, ...arg) {
    // this --->  fn
    var _this = this;
    return function (...ary) {
        // _this(...arg)
        return _this.apply(context, arg.concat(ary))
    }
}

// 判断是否是共有方法？？  一 首先需要是他的属性（in）   二 不能私有属性(hasOwnProperty)
Object.prototype.hasPubProperty = function (key) {
    // 怎么拿到 'push'  ary??
    // key ===> 'push'
    // this ===> ary
    if ((key in this) && !this.hasOwnProperty(key)) {
        return true
    }
    return false
}

// plus  minus
Number.prototype.plus = function (n) {
    return this + n;
}
Number.prototype.minus = function (n) {
    return this - n;
}

//判断数据类型方法
Object.prototype.myType = function () {
    // this 是  ary
    var str = Object.prototype.toString.call(this);// '[object Array]'
    var str2 = str.slice(8, str.length - 1);
    var str3 = str2.toLowerCase();
    return str3;
}

//myPop  myPush
Array.prototype.myPop = function () {
    this.length--
    return this
}
Array.prototype.myPush = function () {
    for (var i = 0; i < ary.length; i++) {
        this[this.length] = ary[i]
    }
    return this
}

//myReverse
Array.prototype.myReverse = function () {
    for (var i = 0; i < this.length / 2; i++) {
        var temp = this[i]
        this[i] = this[this.length - 1 - i]
        this[this.length - 1 - i] = temp
    }
    return this
}

//数组去重
Array.prototype.myUnique = function () {
    var opj = {}
    for (var i = 0; i < this.length; i++) {
        var temp = this[i]
        if (obj.hasOwnProperty(temp)) {
            this.splice(i, 1)
        }

    }
    return arr
}

//类数组转数组
function fn() {
    Array.from(arguments);
    [...arguments];
    [].slice.call(arguments, 0);
}

Array.prototype.del = function (n) {
    var ary = []
    for (var i = 0; i < n; i++) {
        var m = Math.round(Math.random() * (this.length - 1))
        ary = ary.concat(m.splice(m, 1))
    }

    return ary
}

String.prototype.getParam = function(){
    var ary = this.split('?')[1]
    var arg = ary.split('#')[0]
    var res =arg.split('&')
    // console.log(arg);
    var a = {}
    res.forEach((timp) => {
        var b = timp.split('=')
        a[b[0]] = b[1]
    })
    a.hash = this.split('#')[1]
    return a
}