<template>
    <div class="cart">
        <div class="cart-title">
            购物清单
        </div>
        <div class="cart-header">
            <div class="cart-header-info">商品信息</div>
            <div class="cart-header-price">单价</div>
            <div class="cart-header-count">数量</div>
            <div class="cart-header-total">小计</div>
            <div class="cart-header-delete">删除</div>
        </div>
        <div class="cart-goods" v-for="(item,index) in cartList" :key="item.id">
            <div class="cart-header-info">
                <img :src="productDic[item.id].image">
                {{productDic[item.id].name}}
            </div>
            <div class="cart-header-price">￥{{productDic[item.id].cost}}</div>
            <div class="cart-header-count">
                <span @click="handleProductCount(-1,index)">-</span>
                {{item.count}}
                <span @click="handleProductCount(1,index)">+</span>
            </div>
            <div class="cart-header-total">￥{{item.count * productDic[item.id].cost}}</div>
            <div class="cart-header-delete" @click="handleDelete(index)">删除</div>
        </div>
        <div v-if="cartList.length == 0" class="empty-cart">购物车为空</div>
        <div class="cart-pay" v-if="cartList.length">
            <div class="cart-pay-promotion">
                <span>使用优惠码:</span>
                <input v-model="promotionCode" type="text">
                <span @click="handleVerify" class="cart-pay-verify">验证</span>
            </div>
            <div class="cart-pay-info">
                <div>共计<span>{{totalCount}}</span>件商品</div>
                <div>
                    应付总额：<span>￥{{totalCost}}</span>
                    <div v-if="showPromotion">(优惠金额:<span>￥ 500</span>)</div>  
                </div>
                <div @click="handlePay" class="cart-pay-verify">立即支付</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            promotionCode: "",
            showPromotion: false
        }
    },
    computed: {
        cartList(){
            return this.$store.state.cartList;
        },
        productDic(){
            let pDic = {};
            this.$store.state.productList.forEach(item => {
                pDic[item.id] = item;
            });
            return pDic;
        },
        totalCount(){
            let total = 0;
            this.cartList.forEach(item => {
                total += item.count;
            });
            return total;
        },
        totalCost(){
            let total = 0;
            this.cartList.forEach(item => {
                total += this.productDic[item.id].cost * item.count;
            });
            return this.showPromotion ? total-500 : total;
        }
    },
    methods: {
        handleProductCount(num, index){
            this.$store.commit("handleCart",{
                num: num,
                index: index
            })
        },
        handleDelete(index){
            this.$store.commit('deleteCart', this.cartList[index].id);
        },
        handleVerify(){
            if(this.promotionCode === ""){
                window.alert("请输入优惠码");
            }else if(this.promotionCode !== "Vue.js"){
                window.alert("优惠码有误！");
            }else{
                this.showPromotion = true;
            }
        },
        handlePay(){
            this.$store.dispatch('buy').then(() => {
                    window.alert('购买成功');
                    //window.location.reload();
            });
        }
    }
}
</script>
<style scoped>
    .cart{
        max-width:1080px;
        margin: 3.125em auto;
        border-radius: 1em;
        border: 1px solid #e0e0e0;

    }
    .cart-header, .cart-goods{
        display:flex;
        justify-content: space-between;
        text-align: center;
    }
    .cart-goods{
        border-bottom: 1px dashed #e0e0e0;
    }
    .cart-header{
        background:#e0e0e0;
    }
    .cart-title{
        font-size:1.25rem;
        margin: 0.5em;
    }
    [class*="cart-header-"]{
        width:10em;
        display: flex;
        align-items:center;
        justify-content: center;
        padding: 0.5em 0;
    }
    .cart-header-info{
        width:30em;
        justify-content: left;
        text-align: left;
        margin-left: 2em;
    }
    .cart-header-info img{
        width:3em;
        height:3em;
    }
    .cart-header-count span{
        width: 1.25em;
        height: 1.25em;
        border-radius: 50%;
        border: 1px solid #e0e0e0;
        text-align:center;
        line-height: 1;
        cursor: pointer;
    }
    .cart-goods .cart-header-delete{
        color: #0070c9;
        cursor: pointer;
    }
    .empty-cart{
        margin: 1em;
        text-align: center;
    }
    .cart-pay-info{
        margin: 0 2em 2em 0;
        float:right;
    }
    .cart-pay-info div{
        display: inline-block;
        margin-left: 1em;
    }
    .cart-pay{
        overflow: auto;
    }
    .cart-pay-promotion{
        margin: 2em 2em;
    }
    .cart-pay-verify{
        background: #2d8cf0;
        color: white;
        padding: 0.2em 0.5em;
        border-radius: 0.5em;
        margin-left: 1em;
    }
    .cart-pay-info span{
        color: red;
        font-size: 1.25rem;
    }
</style>