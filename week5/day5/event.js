function on(ele, type, f) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || []
        if (ele[type].indexdOf(f) === -1) {
            ele[type].push(f)
        }
    } else {
        type = type.replace(/^on/g, '')
        ele.addEventListener(type, f, false)
    }
}
function fire(ele, type,...arg) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || []
        ele[type].forEach(item=>{
            item.call(this,...arg)
        })
           
        
    }
}
function off(ele, type, f) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || []
        let n = ele[type].indexdOf(f)
        if (n != -1) {
            ele[type].splice(n, 1)
        }
    } else {
        type = type.replace(/^on/g, '')
        ele.removeEventListener(type, f, false)
    }
}