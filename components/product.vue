<template>
    <div class="product">
        <router-link :to="'/introduce/' + info.id" class="product-card">
            <img :src="info.image" class="product-img">
            <div @click.prevent="handleAddCart" class="product-button">加入购物车</div>
            <h4>{{info.name}}</h4>
            颜色：<div class="product-color" :style="{backgroundColor: colors[info.color], borderColor:colors[info.color]==='#ffffff'?'#000':colors[info.color]}"></div>
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
<style scoped lang="less">
.product{
    width: 25%;
    &-card{
        display:block;
        margin: 1em;
        padding: 1em;
        overflow: hidden;
        text-align: center;
        border: 1px solid #e0e0e0;
        border-radius: 0.3125em;
        text-decoration: none;
        position: relative;
        color: black;
        .product-img{
            width:100%;
            border-radius: 0.25em;
        }
        h4{
            margin: 0.625em 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .product-price{
            color:red;
            margin: 0.625em 0;
        }
        .product-color{
            height: 0.625em;
            width: 0.625em;
            border-radius: 50%;
            border:1px solid black;
            display:inline-block;
        }
        .product-button{
            position: absolute;
            top: 0.3125em;
            right: 0.3125em;
            background-color: rgb(45, 140, 240);
            border-radius: 0.25em;
            border-color: rgb(45, 140, 240);
            color: white;
            font-size: 0.875rem;
            height: 1.5em;
            width: 6em;
            text-align: center;
            line-height: 1.5;
            display:none;
        }
    }
    &:hover h4{
        color: #0070c9;
    }
    &:hover .product-button{
        display: inline-block;
    }
}

</style>