(function () {
    let dataAry
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.response)
            console.log(data)
            dataAry = data
        }
    }
    xhr.send()
    let mainBox = document.querySelector('main')
    function renderHtml(ary) {
        let str = ''
        ary.forEach(item => {
            let { img, title, num, price } = item
            str += `<div class="good_box">
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
        mainBox.innerHTML = str
    }
    renderHtml(dataAry)

    let timeBtn = document.querySelector('.timeBtn'),
        priceBtn = document.querySelector('.priceBtn'),
        commentBtn = document.querySelector('.commentBtn');

    let flag = 1
    timeBtn.onclick = function () {
        flag *= -1
        dataAry.sort((a, b) => {
            return (a.time - b.time) * flag
        })
        renderHtml(dataAry)
    }
    priceBtn.onclick = function () {
        flag *= -1
        dataAry.sort((a, b) => {
            return (a.price - b.price) * flag
        })
        renderHtml(dataAry)
    }
    commentBtn.onclick = function () {
        flag *= -1
        dataAry.sort((a, b) => {
            return (a.num - b.num) * flag
        })
        renderHtml(dataAry)
    }
})()
