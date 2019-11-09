//fs 是node内模块   用来操作文件的  读写文件
// I/O input  output; IO 操作 文件的读写
let fs = require('fs')

//readFile 执行有三个参数 url  编码格式  回调函数
//                             'utf-8'
/* fs.readFile('./package.json','utf-8',(err,data)=>{
    //若读取文件  则 err 就会有对应的值
    //若成功 则err为null
    if(!err){
    console.log('data',data)
    }else{
    console.log('err',err)
    }
})

console.log(666) */

/* let data = fs.readFileSync('./1.less','utf-8') 
console.log(data)
console.log(666)、
 */

/* 
fs.readdir('./node', null, (err, data) => {
    if (!err) {
        // console.log('data', data)
        data.forEach(item=>{
            fs.readFile('./node/','utf-8',(e,d)=>{
                if(!e){
                    console.log(d)
                }else{
                    console.log(e)
                }
            })
        })
    } else {
        console.log('err', err)
    }
}) */

fs.mkdir('./qqq', (err) => {
    if (!err) {
        console.log('创建成功')
    }
})
/* fs.rmdir('./qqq', (err) => {
    if (!err) {
        console.log('删除成功')
    }
}) */