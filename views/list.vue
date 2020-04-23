<template>
    <div>
        <div class="list-control">
            <div class="brands">
                <span>品牌：</span>
                <div v-for="item in brands" 
                    @click="handleFilterBrand(item)" 
                    class="brand"
                    :class = "{on: item === filterBrand}"
                    :key="item">{{item}}</div>
            </div>
            <div class="colors">
                <span>颜色：</span>
                <div v-for="item in colors" 
                    @click="handleFilterColor(item)"
                    class="color"
                    :class = "{on: item === filterColor}"
                    :key="item">{{item}}</div>
            </div>
            <div class="sort">
                <span>排序：</span>
                <div class="sort-item" 
                    :class = "{on: order === 'default'}"
                    @click="handleSortDefault">默认</div>
                <div class="sort-item"
                    :class = "{on: order === 'sales'}"
                     @click="handleSortSales">
                    销量
                    <span v-if="order==='sales-desc'">↓</span>
                </div>
                <div class="sort-item" 
                    :class = "{on: order.indexOf('price')>-1}"
                    @click="handleSortPrice">
                    价格
                    <span v-if="order==='price-asc'">↑</span>
                    <span v-if="order==='price-desc'">↓</span>
                </div>
            </div>
        </div>
        <div class="list-goods">
            <Product v-for="item in filterdProducts" :info="item" :key="item.id"></Product>
        </div>
        
    </div>
</template>
<script>
import Product from "../components/product.vue";
export default {
    components: {Product},
    data(){
        return {
            filterBrand: '',
            filterColor: '',
            order: 'default'
        }
    },
    computed:{
        productList(){
            return this.$store.state.productList;
        },
        brands(){
            return this.$store.getters.getBrands;
        },
        colors(){
            return this.$store.getters.getColors;
        },
        filterdProducts(){
            let arr = [...this.productList];
            if(this.filterBrand !== ""){
                arr = arr.filter(item=>item.brand === this.filterBrand);
            };
            if(this.filterColor !== ""){
                arr = arr.filter(item => item.color === this.filterColor);
            };
            if(this.order == "" && this.order == "default"){
                return arr;
            }
            if(this.order == "sales"){
                arr.sort((a,b)=>(b.sales - a.sales));
            }
            if(this.order == "price-desc"){
                arr.sort((a,b) => (b.cost - a.cost));
            }
            if(this.order == "price-asc"){
                arr.sort((a,b) => (a.cost - b.cost));
            }
            return arr;
        }
    },
    mounted(){
        //this.$store.dispatch("getProductList");
    },
    methods: {
        handleFilterBrand(brand){
            this.filterBrand = this.filterBrand === brand ? "" : brand;
        },
        handleFilterColor(color){
            this.filterColor = this.filterColor === color ? "" : color;
        },
        handleSortDefault(){
            this.order = "default";
        },
        handleSortSales(){
            this.order = "sales";
        },
        handleSortPrice(){
            if(this.order == "price-asc"){
                this.order = "price-desc";
            }else{
                this.order = "price-asc";
            }
        }
    }
}
</script>
<style scoped lang="less">
.list-control{
    margin:1em 0.75em 0.5em;
    border: 1px solid #e0e0e0;
    border-radius: 0.5em;
    .brands{
        display: flex;
        margin: 1.25em;
        .brand{
            margin: 0 0.3125em;
            border: 1px solid #e0e0e0;
            border-radius: 0.1875em;
            padding:0.125em 0.25em;
            &:hover{
                background: #e0e0e0;
            }
            &.on, &.on:hover{
                background: red;
                color: white;
                border: 1px solid red;
            }
        }
    }
    .colors{
        .brands;
        .color{
            .brands .brand;
        }
    }
    .sort{
        .brands;
        .sort-item{
            .brands .brand;
        }
    }
}
.list-goods{
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.75em;
}
</style>