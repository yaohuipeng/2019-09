
let { getCss, setCss, winH, offset, fadeIn } = utils
let oLis = document.querySelectorAll('.body li')
let box = document.getElementsByClassName('body')[0];
let oImgs = box.getElementsByTagName('img');
let flag = false
let n = 0
function getData() {
    flag = true

    let xhr = new XMLHttpRequest()
    xhr.open('get', './data.json', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response)
            render(data)
            loadAll()
            flag = false
        }
    }
    xhr.send()
}
getData()

function render(ary) {
    let str = ''
    ary.forEach((item, index) => {
        let { pic, desc, height, author } = item
        // str = `<div class="img_box">
        //         <img src="${pic}" style="height:${height}px" alt="">
        //         <p class="desc">${desc}</p>
        //         <p class="author">${author}</p>
        //     </div>`
        // // oLis[index % 5].innerHTML += str
        // let time = getMinLi()
        // time.innerHTML += str
        str = `<img realSrc="${pic}" src='./img/1.jpg' alt=""style='height:${height}px'>
                <p class="desc">${desc}</p>
                <p class="author">${author}</p>
                `
        let temp = getMinLi()
        let div = document.createElement('div')
        div.className = 'img_box'
        div.innerHTML = str
        temp.appendChild(div)
    })

}

function getMinLi() {
    let ary = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight
    })
    return ary[0]
}

function loadMore() {
    if (n >= 3) return
    let li = getMinLi()
    if (offset(li).t + li.clientHeight <= document.documentElement.scrollTop + winH().h) {
        if (flag) return
        if (offset(li).t + li.clientHeight < document.documentElement.scrollTop + winH().h) {
            // console.log(666);
            getData()
            // n++
        }
    }
}

window.onscroll = function () {
    loadMore()
    loadAll()
}

function loadImg(ele) {
    if (ele.myLoad) return
    if (offset(ele).t + ele.clientHeight / 2 <= document.documentElement.scrollTop + winH().h) {
        let realSrc = ele.getAttribute('realSrc')
        let tepm = new Image()
        tepm.src = realSrc
        tepm.onload = function () {
            ele.src = realSrc
            ele.myLoad = true
            fadeIn(ele)
        }
        tepm = null

    }
}

function loadAll() {
    [...oImgs].forEach(itme => {
        loadImg(itme)
    })
}