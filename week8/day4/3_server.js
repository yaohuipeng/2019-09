//实现一个登录
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:8000')
    res.header('Access-Control-Allow-Credentials',true)
    next();
})

app.use((req,res,next)=>{
    let str = '';
    req.on('data',(chunk)=>{
        str += chunk;
    })
    req.on('end',()=>{
        let obj = {};
        try {
            obj = JSON.parse(str)
        } catch (error) {
            obj = qs.parse(str)
        }
        req.body = obj;
        next();
    })
})

