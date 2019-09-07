//utils 这个js提供一些我们常用的样式
var utils = {
    getCss: function (ele, attr) {
        var reg = /^[+-]?\d+(\.\d+)?(px|pt|em|rem)?$/
        var obj = getComputedStyle(ele, null)
        var res = obj[attr]
        if (reg.test(res)) {
            return parseFloat(res)
        }
        return res
    },
    setCss: function (ele, attr, val) {
        var reg = /width|height|padding|margin|left|top|right|bottom/i
        if (reg.test(attr)) {
            ele.style[attr] = parseFloat(val) + 'px'
        } else {
            ele.style[attr] = val
        }

    },
    offset: function (ele) {
        var l = ele.offsetLeft
        var t = ele.offsetTop
        var temp = ele.offsetParent
        while (temp) {
            l += temp.offsetLeft + temp.clientLeft
            t += temp.offsetTop + temp.clientTop
            temp = temp.offsetParent
        }
        return {
            l, t
        }
    },
    winH: function () {
        return document.documentElement.clientHeight || document.body.clientHeight
    },
    fadeIn: function (ele) {
        ele.style.opacity = 0
        let a = 0

        ele.timer = setInterval(() => {
            a += 0.02
            if (a >= 1) {
                a = 1
            }
            ele.style.opacity = a
        }, 20)
    }
}