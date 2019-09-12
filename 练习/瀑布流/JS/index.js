
let { getCss, setCss, winH, offset, fadeIn } = utils//引入  utlis  方法
let flag = false// 数据已请求完成； true代表正在请求
var olis = document.querySelectorAll('.box>li')
function init() {
    [...olis].forEach(itme => itme.innerHTML = '')
}//清除原有样式
init()
// 第一步 获取数据，
function getData() {
    flag = true
    // 获取数据的方法
    let xhr = new XMLHttpRequest()// 创造实例
    xhr.open('get', './data.json', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /200|304/.test(xhr.status)) {
            // 代表请求成功
            flag = false
            let data = JSON.parse(xhr.response)
            //    console.log(data) 
            renderHtml(data)// 把后台给的数据渲染了
            loadAll()// 保证首屏图片加载出来
        }
    }
    xhr.send()
}
getData()


// 第二步  渲染数据// render函数什么时候执行？？
function renderHtml(ary) {
    ary.forEach((itme, index) => {
        // ary存储的时每一条数据，难么这些数据应该渲染到哪里； 
        // 渲染到写好的那五列中；
        let { pic, author, desc, height } = itme
        let str = `
                <div class="img">
                <img style="height:${height}" src="./img/1.gif" realSrc="${pic}" alt="">
                </div>
                <p class="desc">${desc}</p>
                <div class="author">${author}</div>
            `
        /* //1、挨个添加
        let n = index % 5
        olis[n].innerHTML += str */
        //2、每次添加挑最低的添加
        let temp = getMinLi()
        // temp.innerHTML += str
        let div = document.createElement('div')
        div.className = 'pic_box'
        div.innerHTML = str
        temp.appendChild(div)

    })
}

// 挑选最矮的li
function getMinLi() {
    // 怎么从五个li中挑选出最低的  clientHeight
    var ary = [...olis].sort((a, b) => {
        return a.clientHeight - b.clientHeight
    })
    // console.log(ary)
    return ary[0]

}

// 第三步  滚动 加载新数据；
function loadMore() {
    if (flag) return// flag 为true代表数据正在加载，这时我们不应该再去加载新数据
    // 1、什么时候加载新数据？ 当最短的那个li露出底部的时候
    // 2、怎么加载新数据？
    let scrT = document.documentElement.scrollTop;
    // 卷去的高度
    let wH = winH()// 一屏幕的高度
    let temp = getMinLi()// 获取最低的那个LI
    let tarT = offset(temp).t + temp.clientHeight
    // 元素到body的距离+元素本身的高度  就是元素底边到body的距离
    if (tarT < scrT + wH) {
        // 底部露出之后  加载新数据
        console.log(1)
        getData()
    }
}

window.onscroll = function () {
    loadMore()
    loadAll()// 欢动屏幕的时候执行 loadAll
}
function loadImg(ele) {
    if (ele.loaded) return
    let scrT = document.documentElement.scrollTop
    let wH = winH()
    let tarT = offset(ele).t
    if (tarT < scrT + wH) {
         // 图片加载
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
    // 获取所有的img; 然后挨个执行 loadImg()
    let imgs = document.querySelectorAll('.box img');
    [...imgs].forEach(item => loadImg(item))
}

