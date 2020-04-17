const routers = [
    {
        path: "/list",
        meta: {
            title: "商品列表"
        },
        // 不知道为啥这样写
        component: (resolve) => require(['./views/list.vue'], resolve)
    },
    {
        path: '/introduce/:id',
        meta: {
            title: '商品详情'
        },
        component: (resolve) => require(['./views/introduce.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: "*",
        redirect: "/list"
    }
];
export default routers;