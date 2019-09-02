// 封装一个类数组转数组的方法
let olis = document.getElementsByTagName('li')
Object.prototype.trans = function(){
    //this 就是我们要转化的类数组
    return [...this]
    return Array.ftom(this)
    return [].slice.call(this)
}
let lis = olis.trans()

//从数组或者类数组中随即筛选迹象 返回值有筛选项组成的新数组
Object.prototype.rm = function(n){
    // this.length 和 n 的情况
    if(n>this.length){
        throw new Error('删除个数不合法')
    }
    //随即筛选n项
    //splice 筛选 某一(Math.round(Math.randm()*(this.length-1)))项
    // splice 需要执行 n 次
    let ary = []
    let temp = [...this]
    for(var i=0 ;i<n;i++){
        let m = Math.round(Math.random()*(temp.length-1));
        ary = ary.concat(temp.splice(m,1))
    }
    return ary
}
console.log(olis.rm(4))//随即筛选两项  返回值是筛选项组成的新数组

Array.prototype.unique = function(){
    //双for去重：
    //对象去重：
    //indaxof  lastIndexof  合起来去重：
    var temp = new Set(this)
    return  [...temp]
}

String.prototype.getParame = function(n){
    var str = this.split('?')[1]
    var ary = str.split('&')
    var obj = {}
    ary.forEach((item)=>{
        var arr = item.split('=')
        obj[arr[0]] = arr[1]
    })
    if(n){
       return obj[n]
    }
    return obj
}
var str = 'https://www.souyidai.com/p2p?id=3964660765015&a=12&b=23'
console.log(str.getParame('id'));
console.log(str.getParame('a'));
console.log(str.getParame('b'));
console.log(str.getParame());