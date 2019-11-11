// fs
// url.parse 获取 url 上的参数
// path.resolve 获取绝对路径
// http 是起服务模块

// __dirname  __filename
let http = require('http')
let {readFile} = require('./promiseFs.js')

http.createServer((req,res)=>{
    // req 存放的是请求信息
    // res 存放的是相应信息
    // 只要前端发送了请求，就会执行该函数
    if(req.url=='/favicon.ico'){
        readFile('./1.png').then(data=>{
            console.log(data)
            res.end(data)
        })
        
        // res.end('./1.png')
    }else{
        res.end('666')
    }
    // res.end('888')//给前端相应的
}).listen(8000,()=>{
    // 服务启动成功后执行该函数
    console.log('服务启动成功  端口是8000')
})