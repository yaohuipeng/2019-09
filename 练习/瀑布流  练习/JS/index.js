let { getCss, setCss, winH, offset,} = utils
let olis = document.querySelectorAll('.box>li')
function lise() {
    [...olis].forEach(time => { time.innerHTML = '' })
}
lise()
let flag = false
function getData() {
    flag = true
    let xhr = new XMLHttpRequest()
    xhr.open('get', './data.json', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /200|304/.test(xhr.status)) {
            flag = false
            let data = JSON.parse(xhr.response)
            renderHtml(data)
            loadAll()
        }
    }
    xhr.send()
}
getData()

function renderHtml(ary) {
    ary.forEach((time) => {
        let { pic, author, desc, height } = time
        let str = `<div class="img">
                    <img style="height: ${height}" src="./img/1.gif" realSrc ="${pic}" alt="">
                </div>
                <div class="besc">${desc}</div>
                <div class="author">${author}</div>`

        let temp = getMinLi()
        let div = document.createElement('div')
        div.className = 'pic_box'
        div.innerHTML = str
        temp.appendChild(div)
    })
}

function getMinLi() {
    let ary = [...olis].sort((n, m) => {
        return n.clientHeight - m.clientHeight
    })
    return ary[0]
}

function loadMore() {
    if (flag) return
    let scrT = document.documentElement.scrollTop
    let wH = winH()
    let temp = getMinLi()
    let tarT = offset(temp).t + temp.clientHeight
    if (tarT < scrT + wH) {
        console.log(11111)
        getData()
    }
}

window.onscroll = function () {
    loadMore()
    loadAll()
}

function loadImg(ele) {
    if (ele.loaded) return
    let scrT = document.documentElement.scrollTop
    let wH = winH()
    let tarT = offset(ele).t
    if (tarT < scrT + wH) {
        let realSrc = ele.getAttribute('realSrc')
        let temp = new Image()
        temp.src = realSrc
        temp.onload = function () {
            ele.src = realSrc
            fadeIn(ele)
            temp = null
            ele.loaded = true
        }
    }
}
function loadAll() {
    // debugger
    let imgs = document.querySelectorAll('.box img');
    [...imgs].forEach(item => loadImg(item))
}

function fadeIn(ele) {
    ele.style.opacity = 0;
    let a = 0;
    ele.timer = setInterval(() => {
        a += 0.1;
        if (a >= 1) {
            a = 1;
            clearInterval(ele.timer)
        }
        ele.style.opacity = a;
    }, 20)
}