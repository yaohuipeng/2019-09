
class Banner {
    constructor(idSelector,uln) {
        this.uln = uln
        this.box = document.querySelector(idSelector)
        this.ul = this.box.querySelector('.img_box ul')
        this.tipBox = this.box.querySelector('.tip_box')
        this.tips = this.box.getElementsByClassName('tip')
        this.leftBtn = this.box.querySelector('.left_btn')
        this.rigthBtn = this.box.querySelector('.rigth_btn')
        this.n = 0
        this.timer = null
        this.getData()
        this.bindEvent()
    }

    getData() {
        var xhr = new XMLHttpRequest()
        xhr.open('get', this.uln, true)
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
                let data = JSON.parse(xhr.response)
                console.log(data)
                this.render(data)
                this.move()
                this.tipClick()
                this.dabounce()
            }
        }
        xhr.send()
    }

    render(data) {
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
        this.tipBox.innerHTML = tipstr
        this.ul.innerHTML = str;
        this.ul.style.width = data.length * 590 + 'px'
    }

    move() {
        this.timer = setInterval(() => {
            this.change()
        }, 1000)
    }

    change() {
        this.n++
        if (this.n == (this.tips.length + 1)) {
            this.ul.style.transition = 'left 0s ease-in'
            this.ul.style.left = 0
            this.n = 1
        }
        this.tipClass(this.n)
        setTimeout(() => {
            this.ul.style.transition = 'left 0.5s ease-in'
            this.ul.style.left = -590 * this.n + 'px'
        }, 10)
    }

    tipClass(m) {
        m = m >= this.tips.length ? 0 : m
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].className = 'tip'
        }
        this.tips[m].className = 'tip current'
    }

    tipClick() {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick = () => {
                this.n = i
                this.tipClass(this.n)
                // animate(ul, { 'left': -590 * n }, 500)
                this.ul.style.transition = 'left 0.5s ease-in'
                this.ul.style.left = -590 * this.n + 'px'
            }
        }
    }

    bindEvent() {
        this.box.onmouseenter = () => {
            clearInterval(this.timer)
        }
        this.box.onmouseleave = () => {
            this.move()
        }
        this.rigthBtn.onclick = this.dabounce(() => {
            this.change()

        })
        this.leftBtn.onclick = () => {
            this.n--
            if (this.n < 0) {
                this.ul.style.transition = 'none'
                this.ul.style.left = -590 * (this.tips.length) + 'px'
                this.n = this.tips.length - 1
            }
            this.tipClass(this.n)
            setTimeout(() => {
                this.ul.style.transition = 'left 0.5s ease-in'
                this.ul.style.left = -590 * this.n + 'px'
            }, 10)
        }
    }

    dabounce(fn, wait = 300) {
        var timer = null
        return function () {
            if (timer == null) {
                fn.apply(this, arguments)
                timer = 0
                return
            }
            clearInterval(timer)
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait)
        }
    }

}
new Banner('#box','./data.json')
new Banner('#box2','./data.json')