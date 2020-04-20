<template>
    <div>
        <div class="product-info">
            <img :src="getProductInfo.image">
            <div class="product-info-detail">
                <h1>{{getProductInfo.name}}</h1>
                <div class="product-price">￥{{getProductInfo.cost}}</div>
                <div @click="handleAddCart" class="product-addCart">加入购物车</div>
            </div>
        </div>
        <div class="product-intro">
            <h2>商品介绍</h2>
            <div v-for="n in 3" :key="n">
                <img 
                    src="https://img.alicdn.com/imgextra/i4/277891388/O1CN01y3Av6f1M7kFcY51Wo_!!277891388.jpg">
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id: parseInt(this.$route.params.id),
        }
    },
    computed:{
        getProductInfo(){
            return this.$store.state.productList.find(item => item.id === this.id);
        }
    },
    methods:{
        handleAddCart(){
            this.$store.commit("addToCart", this.id);
        }
    }
}
</script>
<style scoped>
.product-info, .product-intro{
    margin: 40px;
    padding:15px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    position: relative;
}
.product-info{
    box-sizing: border-box;
    display: flex;
    align-items:center;
}
img{
    width:70%;
}
.product-info-detail{
    float:right;
    width:30%;
    text-align:center;
}
.product-price{
    color:red;
    margin: 1em auto;
    font-size: 1.5rem;
}
.product-addCart{
    background: #0070c9;
    color: white;
    font-size:1.5rem;
    width:10em;
    border-radius: 1.5em;
    margin:auto;
    padding:0.25em;
}
.product-intro{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.product-intro img{
    width:30%;
}
</style>