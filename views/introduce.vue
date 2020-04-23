<template>
    <div>
        <div class="product-info">
            <img :src="getProductInfo.image">
            <div class="product-info-detail">
                <h2>{{getProductInfo.name}}</h2>
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
<style scoped lang="less">
.temp{
    margin: 2.5em;
    padding: 1em;
    border: 1px solid #e0e0e0;
    border-radius: 0.3125em;
    position: relative;
}
.product-info{
    .temp;
    box-sizing: border-box;
    display: flex;
    align-items:center;
    img{
        width:70%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.25em;
    }
    .product-info-detail{
        width:30%;
        text-align:center;
        padding-bottom: 0.75em;
        h2{
            margin: 0.5em auto;
        }
        .product-price{
            color:red;
            margin: 0.5em auto;
            font-size: 1.5rem;
        }
        .product-addCart{
            background: #0070c9;
            color: white;
            font-size:1.5rem;
            width:8em;
            border-radius: 1.5em;
            margin:auto;
            padding:0.25em;
        }
    }
}
.product-intro{
    .temp;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img{
        width: 30%;
    }
}
</style>