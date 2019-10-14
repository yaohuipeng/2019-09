var banner = (function () {
    let idSelector = ''
    let $box = null,
        $ul = null,
        $lis = null,
        $tipBpx = null,
        $tips = null,
        $leftBtn = null,
        $rightBtn = null
    var n = 0, timer = null
    function throttle(fn, wait = 500) {
        let flag = true
        return function () {
            if (!flag) return
            flag = false
            setTimeout(() => {
                flag
            })
        }


    }
    function initEle() {
        $box = $(idSelector)
        $ul = $box.find('.img_box ul')
        $lis = $box.find('.img_box ul li')
        $tipBpx = $box.find('.tip_box')
        $tips = $box.children('.tip')
        $leftBtn = $box.find('.left_btn')
        $rightBtn = $box.find('.right_btn')

        $lis.eq(0).show().siblings().hide()
    }
    function getData() {
        $.ajax({
            url: './data.json',
            success: function (data) {
                render(data)
                initEle()
                autoMove()
                eventBind()
            },
            error: function () {
                alert('失败')
            }
        })
    }
    function render(data) {
        let str = ''
        let tipstr = ''
        data.forEach((item, index) => {
            str += `<li>
                    <img src="${item.img}" alt="">
                        <p>${item.desc}</p>
                    </li>`
            tipstr += (index == 0 ? `<span class="tip current"></span> ` : `<span class="tip"></span> `)
        })
        $ul.html(str)
        $tipBpx.html(tipstr)
    }
    function move() {
        n++
        if (n > $lis.length - 1) {
            n = 0
        }
        $lis.eq(n).show().css({ opacity: 0 }).animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
            $lis.eq(n).siblings().hide()
        })
        autoFocus()
    }
    function autoMove() {
        timer = setInterval(() => {
            move()
        }, 2000)
    }
    function autoFocus() {
        $tips.eq(n).addclass('current').siblings().removeClass('current')
    }
    function eventBind() {
        $box.on('mouseenter', function () {
            clearInterval(timer)
        })
        $box.on('mouseleave', function () {
            autoMove()
        })
        $leftBtn.on('clicl', throttle(function () {
            n--
            if (n < 0) {
                n = $lis.length - 1
            }
            move()
        }))
        $rightBtn.on('click', throttle(function () {
            move()
        }))
        $tips.on('click', function () {
            let index = $(this).init()
            n = index

        })
    }

    return {
        init(id) {
            idSelector = '#'+this.attr('id')
            getData()
            initEle()
        }
    }
})()

// banner.init('#box')
$.extend({
    qqq() {
        console.log(666);
    }
})
$.fn.extend({
    aaa() {
        console.log(333);
    },
    bannerInit:banner.init
})
$('#box').bannerInit()