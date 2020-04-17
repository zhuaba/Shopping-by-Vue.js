<template>
    <div class="product">
        <router-link :to="'/introduce/' + info.id" class="product-card">
            <img :src="info.image" class="product-img">
            <div @click.prevent="handleAddCart" class="product-button">加入购物车</div>
            <h4>{{info.name}}</h4>
            颜色：<div class="product-color" :style="{backgroundColor: colors[info.color]}"></div>
            <div class="product-price">￥{{info.cost}}</div>
        </router-link>
    </div>
</template>
<script>

export default {
    props:{
        info: Object
    },
    data(){
        return {
            colors:{
                '白色': '#ffffff',
                '金色': '#dac272',
                '蓝色': '#233472',
                '红色': '#f2352e'
            }
        }
    },
    methods:{
        handleAddCart(){
            this.$store.commit('addToCart', this.info.id);
        }
    }
}
</script>
<style scoped>
.product{
    width:25%;
    float:left;
}
.product-card{
    display:block;
    margin:16px;
    padding: 16px;
    overflow: hidden;
    text-align: center;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    text-decoration: none;
    position: relative;
    color: black;
}
.product-img{
    width:100%;

}
h4{
    color:black;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.product:hover h4{
    color: #0070c9;
}
.product-price{
    color:red;
    margin:10px 0;
}
.product-color{
    height:10px;
    width:10px;
    border-radius: 50%;
    border:1px solid black;
    display:inline-block;
}
.product-button{
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgb(45, 140, 240);
    border-radius: 3px;
    border-color: rgb(45, 140, 240);
    color: white;
    font-size: 14px;
    height: 22px;
    width: 86px;
    text-align: center;
    line-height: 22px;
    display:none;
}
.product:hover .product-button{
    display: inline-block;
}
</style>