import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import Routers from './router.js';
import App from './app.vue';
import product_data from "./product.js"

import './style.less';
Vue.use(VueRouter);
Vue.use(Vuex);

const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});
router.afterEach((to, from, next) => {
    window.scrollTo(0,0);
});

let getFilterArray = function(arr){
    return [...new Set(arr)];
}

const store = new Vuex.Store({
    state:{
        cartList: [],
        productList: []
    },
    getters:{
        getBrands(state){
            let brands = state.productList.map(item => {
                return item.brand
            });
            return getFilterArray(brands);
        },
        getColors(state){
            let colors = state.productList.map(item => {
                return item.color;
            });
            return getFilterArray(colors);
        }
    },
    mutations: {
        setProductList(state, data){
            state.productList = data;
        },
        addToCart(state, id){
            const index = state.cartList.findIndex((item)=>(item.id === id))
            if(index >= 0){
                state.cartList[index].count++;
            }else{
                state.cartList.push({
                    id: id,
                    count: 1
                });
            }
        },
        handleCart(state, payload){
            if(payload.num < 0 && state.cartList[payload.index].count == 1){
                return;
            }else{
                state.cartList[payload.index].count += payload.num;
            }
        },
        deleteCart(state, id){
            let index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        emptyCart(state){
            console.log("emptyCart has been done");
            state.cartList = [];
        }
    },
    actions: {
        getProductList(context){
            setTimeout(()=>{
                context.commit('setProductList', product_data);
            },500)
        },
        buy(context){
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit("emptyCart");
                    resolve();
                },500);
            });
        }
    }
})


new Vue({
    el: "#app",
    router: router,
    store: store, 
    //  待理清
    render: h=>(h(App))
})