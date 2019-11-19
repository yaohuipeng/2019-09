Vue.directive('focus', function (el, obj) {
    if (obj.value) {
        setTimeout(() => {
            el.focus()
        }, 300)
    }
})
new Vue({
    el: "#app",
    data: {
        ary: [{
            id: 1,
            todo: "吃",
            done: false,
            editable: false
        },
        {
            id: 2,
            todo: "喝",
            done: false,
            editable: false
        },
        {
            id: 3,
            todo: "玩",
            done: false,
            editable: false
        },
        {
            id: 4,
            todo: "乐",
            done: true,
            editable: false
        }],
        todo: "",
        hash: "",//用来存储当前路径的 hash值
    },
    created() {
        this.hash = location.hash || "#/all";
        window.addEventListener('hashchange', () => {
            this.hash = location.hash
        })
    },
    methods: {
        submit() {
            this.todo = this.todo.trim()
            if (!this.todo.trim()) return
            let obj = {
                id: Math.random(),
                done: false,
                todo: this.todo,
                editable: false
            }
            this.ary.unshift(obj)
            this.todo = ""
        },
        change(obj) {
            obj.editable = !obj.editable
        },
        del(n) {
            this.ary.splice(n, 1)
        }
    },
})