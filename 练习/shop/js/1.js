
var dataArr
var xhr = new XMLHttpRequest()
xhr.open('get', './data.json',false)
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
        dataArr = JSON.parse(xhr.response)
    }
}
xhr.send()
// console.log(dataArr)
var box = document.querySelector('main')
function qqq(arr){
    var res = ''
    arr.forEach((itme)=>{
        var {img,title,price,num} = itme
        res +=`<div class="good_box">
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
    box.innerHTML=res
}
qqq(dataArr)

let timeBtn = document.querySelector('.timeBtn'),
    priceBtn = document.querySelector('.priceBtn'),
    commentBtn = document.querySelector('.commentBtn')

timeBtn.flag = 1
timeBtn.onclick = function(){
    this.flag*= -1
    dataArr.sort((n,m)=>{
        return (n.time-m.time)*this.flag
    })
    qqq(dataArr)
}
priceBtn.flag = 1
priceBtn.onclick = function(){
    this.flag*= -1
    dataArr.sort((n,m)=>{
        return (n.price-m.price)*this.flag
    })
    qqq(dataArr)
}
commentBtn.flag = 1
commentBtn.onclick = function(){
    this.flag*= -1
    dataArr.sort((n,m)=>{
        return (n.num-m.num)*this.flag
    })
    qqq(dataArr)
}