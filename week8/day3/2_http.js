let http = require('http');
let url = require('url');
let { readFile } = require('./promiseFs');

let server = http.createServer((req, res) => {
    // cors 跨域
    // res.setHeader('Access-Control-Allow-Origin','*')
    // res.setHeader()
    res.writableHead(200,{'Access-Control-Allow-Origin':'*'})
    res.end('999')
});

let port = 8000;
let init = true;
function listen() {
    let cb = null;
    if (init) {
        init = false;
        cb = () => {
            console.log('服务起于' + port)
        }
    }
    server.listen(port, cb);
}
listen();
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        // 上个端口被占用了
        port++;
        listen();
    }
})
/* 
    http 怎么起服务
         怎么获取前端数据（路径 参数）
         怎么设置响应头（cors 跨域的设置）
         端口设置的处理

*/