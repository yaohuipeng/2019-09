$(function () {
    let page = 1
    let limit = 5
    console.log(location.hash);
    window.addEventListener('hashchange', function () {
        console.log(location.hash);
        // 将当前操作的导航存到sessionStorage中
        sessionStorage.setItem('customerUrl', './page/customerlist.html' + location.hash)
    })
    function getData(options = {}) {
        options.lx = location.hash.slice(1)
        axios.get('/customer/list', {
            params: options
        }).then(data => {
            render(data.data)
            initPage(data.limit, data.total, data.page)
            return (data.data)

        })
    }

    function render(data) {
        let str = ''
        data.forEach(item => {
            let { name, sex, email, phone, QQ, weixin, type, userName, address, id } = item
            str += `<tr>
                        <td class="w8">${name}</td>
                        <td class="w5">${sex ? '女' : '男'}</td>
                        <td class="w10">${email}</td>
                        <td class="w10">${phone}</td>
                        <td class="w10">${weixin}</td>
                        <td class="w10">${QQ}</td>
                        <td class="w5">${type}</td>
                        <td class="w8">${userName}</td>
                        <td class="w20">${address}</td>
                        <td class="w14">
                            <a href="./customeradd.html?id=${id}">编辑</a>
                            <a href="">删除</a>
                            <a href="./visit.html">回访记录</a>
                        </td>
                    </tr>`
        })

        $('tbody').html(str)
    }
    getData({
        limit,
        page
    })
    function initPage(limit, total, current) {
        let n = Math.ceil(total / limit)
        let str = ''
        for (let i = 0; i < n; i++) {
            str += `<li class=${i + 1 == current ? 'active' : ''}>${i + 1}</li>`
        }
        $('.pageNum').html(str)
        $('.pageBox').off()
        $('.pageBox').on('click', function (e) {
            let tar = e.target
            let type = tar.tagName.toLowerCase()
            if (type == 'li') {
                page = tar.innerHTML
                getData({
                    limit,
                    page
                })
            } else if (type == 'a') {
                if ($(tar).index() == 0) {
                    page = page == 1 ? 1 : page - 1
                    getData({
                        limit,
                        page
                    })
                } else {
                    page = page == n ? n : page + 1
                }
                getData({
                    limit,
                    page
                })
            }
        })
    }
})