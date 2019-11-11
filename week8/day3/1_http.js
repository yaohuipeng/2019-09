// fs
// url.parse 获取 url 上的参数
// path.resolve 获取绝对路径
// http 是起服务模块

// __dirname  __filename
let http = require('http')
let url = require('url')
let {readFile} = require('./promiseFs.js')

http.createServer((req,res)=>{
    // req 存放的是请求信息
    // res 存放的是相应信息
    // 只要前端发送了请求，就会执行该函数
    // req.url // 前端的请求路径
    // req.method // 前端的请求方法
    console.log(url.parse(req.url,true))// 解析前端路径
    // pathname 是前端给的纯路径
    // query 是前端路径上给的参数
    let {pathname,query} = url.parse(req.url,true)
    if(pathname=='/favicon.ico'){
        readFile('./1.png').then(data=>{
            console.log(data)
            res.end(data)
        })
        
        // res.end('./1.png')
    }else{
        res.end(query)
    }
    // res.end('888')//给前端相应的
    // res.statusCode = 404
    // res.statusMessage = 'hello hahaha'
}).listen(8000,()=>{
    // 服务启动成功后执行该函数
    console.log('服务启动成功  端口是8000')
})