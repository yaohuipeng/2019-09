
function ajax(options) {
    let {
        method = 'get',
        url,
        data = {},
        async = true,
        cache = false,
        headers = {},
        success,
        error
    } = options

    let searchStr = ''
    for (let k in data) {
        searchStr += `${k}=${data[k]}&`
    }
    searchStr = searchStr.replace(/&$/, '')
    method = method.toLowerCase()
    if (method == 'get') {
        if (url.indexOf('?')) {
            url += '?' + searchStr
        } else {
            url += '&' + searchStr
        }
        if (!cache) {
            url += `&_ = ${Date.now()}`
        }
    }

    let xhr = new XMLHttpRequest
    xhr.open(method, url, async)
    xhr, onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (/200|304/.test(xhr.status)) {
                let data
                try {
                    data = JSON.parse(xhr.response)
                } catch{
                    data = xhr.response
                }
                success && success()
            } else if (/[45]\d{2}/.test(xhr.status)) {
                console.log('失败')
            }
        }
    }
    headers = Object.assign(headers, {
        'content-type': 'application/x-www-form-urlencoded'
    }, headers)
    for (let k in headers) {
        xhr.setRequestHeader(k, escape(headers[k]))
    }
    xhr.send(searchStr)
}