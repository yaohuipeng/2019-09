$(function () {
    //当DOM机构加载完成后执行的该函数
    $('.submit').on('click', function (e) {
        let account = $('input[type=text]').val()
        let password = $('input[type=password]').val()
        if (!account || !password) {
            alert('用户名或密码都能为空')
            return
        }
        password = md5(password)//对密进行md5加密
        axios.post('/user/login', {
            account, password
        }).then((data) => {
            //登陆成功
            //1.跳转到首页
            //2.储存权限信息
            console.log(data)
            if (data.code == 0) {
                //密码正确
                location.href = './index.html'
                //储存权限信息
                localStorage.setItem('power', data.power)
                //把用户名存储在本地
                localStorage.setItem('username', account)
            } else {
                //密码错误
                alert('账号密码错误')
            }
        }, (err) => {
            //登陆失败
            alert('网络错误，请稍后重置')
            console.log(err)
        })
    })
})