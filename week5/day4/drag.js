class Drag {
    constructor(id, n) {
        this.box = document.getElementById(id)
        this.n = n
        this.count = 0
        this.START = this.start.bind(this)
        this.MOVE = this.move.bind(this)
        this.END = this.end.bind(this)
        // this.box.addEventListener('mousedown', this.START, false)
        on(this.box,'mousedown', this.START)
    }
    offset(ele) {
        let l = ele.offsetLeft,
            t = ele.offsetTop;
        let temp = ele.offsetParent;
        while (temp) {
            l += temp.offsetLeft + temp.clientLeft;
            t += temp.offsetTop + temp.clientTop;
            temp = temp.offsetParent;
        }
        return {
            l,
            t
        }
    }
    move(e) {
        this.box.style.left = e.pageX - this.startPx + this.startX + 'px'
        this.box.style.top = e.pageY - this.startPy + this.startY + 'px'
    }
    start(e) {
        this.startX = this.offset(this.box).l
        this.startY = this.offset(this.box).t
        this.startPx = e.pageX
        this.startPy = e.pageY
        // document.addEventListener('mousemove', this.MOVE, false)
        // document.addEventListener('mouseup', this.END, false)
        on(document,'mousemove', this.MOVE)
        on(document,'mouseup', this.END)


    }
    end(e) {
        // document.removeEventListener('mousemove', this.MOVE, false)
        // document.removeEventListener('mouseup', this.END, false)
        off(document,'mousemove', this.MOVE)
        off(document,'mouseup', this.END)
        if (this.n === undefined) return
        this.count++
        if (this.count >= this.n) {
            this.clear()
        }
        
    }
    clear() {
        // this.box.removeEventListener('mousedown', this.START, false)
        off(this.box,'mousedown', this.START)
    }
}
// let n = 0

// function addZIndex(ele) {

//     ele.style.zIndex = n++
// }
// function bigZIndex(ele){
//     ele.style.zIndex = 999
// }
// function bacZIndex(ele){
//     ele.style.zIndex = 1
// }