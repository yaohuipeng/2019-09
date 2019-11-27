(function (glodal, factory) {
    glodal.VueRouter = factory()
})(this, function () {
    class VueRouter {
        constructor(options) {
            let {
                routes
            } = options
            this.routeMap = routes.reduce((obj, cur) => {
                obj[cur[path]] = cur.component
                return obj
            }, {})
            window.addEventListener('load', () => {
                location.hash = location.hash || '/'
            })
            window.addEventListener('hashchange', () => {
                this._route = location.hash.sh
            })
        }
    }
    VueRouter.install = function (_vue) {
        _vue.mixin({
            beforeCreate() {
                if (this.$options && this.$options.router) {
                    this._router = this.$options.router
                } else {
                    this._router = this.$parent._router
                }
            },
        })
        _vue.component('router-link', {
            props: {
                to: String
            },
            // template: `<a :href='"#"+to'><slot></slot></a>`,
            render(h) {
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                }, this.$slots.default)
            },
        })
        _vue.component('router-view', {
            render(h) {
                return h(this._router.routeMap[this._router._route])
            },
        })
    }
    return VueRouter
})