
var olis = document.getElementsByTagName('li')
var dataArr
var xhr = new XMLHttpRequest()
xhr.open('get', './data.json', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        dataArr = JSON.parse(xhr.response)
        qqq(dataArr)
        myBind(dataArr)
    }
}
xhr.send()
// console.log(dataArr)
var box = document.querySelector('main')
function qqq(arr) {
    var res = ''
    arr.forEach((itme) => {
        var { img, title, price, num } = itme
        res += `<div class="good_box">
        <div class="img_box"><img
                src="${img}"
                alt=""></div>
        <div class="desc">${title}</div>
        <div class="price">￥${price}</div>
        <div class="bot_box">
            <div class="left_box">选购</div>
            <div class="right_box">评价数${num}</div>
        </div>
    </div>`
    })
    box.innerHTML = res
}


let timeBtn = document.querySelector('.timeBtn'),
    priceBtn = document.querySelector('.priceBtn'),
    commentBtn = document.querySelector('.commentBtn')
function myBind(){
    timeBtn.onclick =function(){
        let ary = [...olis]
        ary.sort((n,m)=>{
            return n.appendChild('qqq')-m.appendChild('qqq')
        })
        ary.forEach(item=>box.appendChild(item))
    }
}