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
            console.log(data)
        }, (err) => {
            console.log(err)
        })
    })
})