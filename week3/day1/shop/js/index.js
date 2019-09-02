
let dataArr
let qqq = new XMLHttpRequest()
qqq.open('get', './data.json', false)
qqq.onreadystatechange = function () {
    if (qqq.readyState == 4 && qqq.status == 200) {

        dataArr = JSON.parse(qqq.response)
    }
}
qqq.send()
// console.log(dataArr)
let box = document.querySelector('main')
function renderHtml(arr) {
    let res = ''
    arr.forEach(item => {
        let { img, title, price, num } = item
        res = `<div class="good_box">
                <div class="img_box"><img
                        src="${img}"
                        alt=""></div>
                <div class="desc">${title}</div>
                <div class="price">￥${price.toFixed(2)}</div>
                <div class="bot_box">
                    <div class="left_box">选购</div>
                    <div class="right_box">评价数${num}</div>
                </div>
            </div>`
    })
    box.innerHTML = res
}
renderHtml(dataArr)

let timeBtn = document.querySelector('.timeBtn')
let priceBtn = document.querySelector('.priceBtn')
let commentBtn = document.querySelector('.commentBtn')

timeBtn.flag = 1
timeBtn.onclick = function(){
    this.flag *=-1
    dataArr.sort((n,m)=>{
        return (n.time-m.time)*this.flag
    })
    renderHtml(dataArr)
}
priceBtn.flag = 1
priceBtn.onclick = function(){
    this.flag *=-1
    dataArr.sort((n,m)=>{
        return (n.price-m.price)*this.flag
    })
    renderHtml(dataArr)
}
commentBtn.flag = 1
commentBtn.onclick = function(){
    this.flag *=-1
    dataArr.sort((n,m)=>{
        return (n.num-m.num)*this.flag
    })
    renderHtml(dataArr)
}