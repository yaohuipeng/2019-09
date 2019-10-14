let $ul = $('#box .img_box ul'),
    $tipBox = $('#box .tip_box'),
    n = 0, timer = null,
    $lis = $('#box .img_box ul li'),
    $tips = $('#box .tip_box .tip'),
    $box = $('#box'),
    $leftBtn = $box.find('#box .left_btn'),
    $rigthBtn = $box.find('#box .rigth_btn')

function getData() {
    $.ajax({
        url: './data.json',
        success: function (data) {
            render(data)
            init()
        },
        error: function () {
            //请求失败
            console.log('失败')
        }
    })
}
getData()

function render(data) {
    let str = ''
    let tipstr = ''
    data.forEach((item, index) => {
        str += `<li>
                    <img src="${item.img}" alt="">
                    <p>${item.desc}</p>
                </li>`
        tipstr += (index == 0 ? `<span class="tip current"></span> ` : `<span class="tip"></span> `)
    });
    $ul.html(str)
    $tipBox.html(tipstr)
}

function init() {
    $lis = $('#box .img_box ul li')
    $tips = $('#box .tip_box .tip')
    $lis.eq(0).siblings().hide()
    autoMove()
}

function autoMove() {
    timer = setInterval(() => {
        move()
    }, 2000)
}


function move() {
    n++
    if (n >= $lis.length) {
        n = 0
    }
    autoFocus()
    $lis.eq(n).css({ opacity: 0 }).show().animate({ opacity: 1 }, 1000).siblings().animate({ opacity: 0 }, 1000, function () {
        $lis.eq(n).siblings().hide();
    });
}

function autoFocus() {
    $tips.eq(n).addClass('current').siblings().removeClass('current')
}

$box.on('mouseenter', function () {
    clearInterval(timer)
})

$box.on('mouseleave', function () {
    autoMove()
})

$rigthBtn.on('click', function () {
    move()
},500)

$leftBtn.on('click', function () {
    n--
    if (n < 0) {
        n = $tips.length - 1
    }
    n--
    move()
},500)