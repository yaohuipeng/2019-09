let ul = document.querySelector('#box .img_box ul'),
    box = document.querySelector('#box'),
    tipBox = document.querySelector('#box .tip_box'),
    tips = document.getElementById('box').getElementsByClassName('tip')

let leftBtn = document.querySelector('#box .left_btn')
let rigthBtn = document.querySelector('#box .rigth_btn')
// 获取数据 
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response);
            console.log(data);
            render(data);
            move()
            tipClick()
        }
    }
    xhr.send();
}
getData();

// 渲染数据
function render(data) {
    data = data || [];
    let str = '';
    let tipstr = ''
    data.push(data[0])
    data.forEach((item, index) => {
        let { img, desc } = item;
        str += `<li>
                <img src="${img}" alt="">
                <p class="desc">${desc}</p>
            </li>`
        if (index !== data.length - 1) {
            if (index == 0) {
                tipstr += `<span class="tip current"></span>\n`
            } else {
                tipstr += `<span class="tip"></span>\n`
            }
        }
    })
    tipBox.innerHTML = tipstr
    ul.innerHTML = str;
    ul.style.width = data.length * 590 + 'px'
}

let n = 0
let timer = null
function move() {
    timer = setInterval(() => {
        change()
    }, 1000)
}

function change(){
        n++
        if (n == tips.length+1) {
            ul.style.left = 0
            n = 1
        }
        tipClass(n)
        animate(ul, { 'left': -590 * n }, 500, function () { })
}

box.onmouseenter = function () {
    clearInterval(timer)
}
box.onmouseleave = function () {
    move()
}
function tipClass(m) {
    m = m >= tips.length ? 0 : m
    for (let i = 0; i < tips.length; i++) {
        tips[i].className = 'tip'
    }
    tips[m].className = 'tip current'
}

rigthBtn.onclick = function(){
    change()

}
leftBtn.onclick = function(){
    n--
    if(n<0){
        ul.style.left = -590*(tips.length)+'px'
        n=tips.length-1
    }
    tipClass(n)
    animate(ul, { 'left': -590 * n }, 500)
}
function tipClick(){
    for (let i = 0; i < tips.length; i++) {
        tips[i].onclick = function(){
            n = i
            tipClass(n)
            animate(ul, { 'left': -590 * n }, 500) 
        }
    }
}