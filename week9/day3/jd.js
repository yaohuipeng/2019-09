Vue.filter('money', function (val) {
    return "￥" + (val / 100).toFixed(2)
})
new Vue({
    el: "#app",
    data: {
        name: "你好",
        datalist: [],
        total: 0,
        checkAll: true,
        show: false,
        delIndex: 0
    },
    created() {
        this.getData()

    },
    methods: {
        getData() {
            fetch('./data.json').then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data)
                this.datalist = data
                this.sum()
                //重置 checkAll
                this.checkAll = this.datalist.every(item => item.isSelect)
            }).catch((err) => {
                console.log(err)
            })
        },
        sum() {
            //求总价

            /* let ary = this.datalist.filter(item => item.isSelect)
            let t = 0
            ary.forEach(item => {
                t += item.count * item.price
            })
            this.total = t */

            this.total = this.datalist.filter(item => item.isSelect).reduce((prev, next) => prev + next.count * next.price, 0)

        },
        checkOndFn() {
            this.checkAll = this.datalist.every(item => item.isSelect)
            this.sum()
        },
        checkAllFn() {
            this.datalist.forEach(item => {
                item.isSelect = this.checkAll
            })
            this.sum()
        },
        del(n) {
            // this.datalist.splice(n,1)
            // this.sum()
            this.delIndex = n
            this.show = true
        },
        cancel() {
            this.show = false
        },
        sure() {
            this.show = false
            this.datalist.splice(this.delIndex, 1)
            this.checkAll = this.datalist.every(item => item.isSelect)
            this.sum()
        },
        clear() {
            this.datalist = []
            this.sum()
        }
    },
})