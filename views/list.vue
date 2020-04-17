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
                    :key="item">{{item}}</div>
            </div>
            <div class="sort">
                <span>排序：</span>
                <div class="sort-item" @click="handleSortDefault">默认</div>
                <div class="sort-item" @click="handleSortSales">
                    销量
                    <span v-if="order==='sales-desc'">↓</span>
                </div>
                <div class="sort-item" @click="handleSortPrice">
                    价格
                    <span v-if="order==='price-asc'">↑</span>
                    <span v-if="order==='price-desc'">↓</span>
                </div>
            </div>
        </div>
        <Product v-for="item in filterdProducts" :info="item" :key="item.id"></Product>
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
            order: ''
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
        this.$store.dispatch("getProductList");
    },
    methods: {
        handleFilterBrand(brand){
            this.filterBrand = brand;
        },
        handleFilterColor(color){
            this.filterColor = color;
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
<style scoped>
.list-control{
    height:160px;
    margin:5px 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
}
.brands, .colors, .sort{
    display: flex;
    margin: 20px;
}
.brand, .color, .sort-item{
    margin: 0 5px;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    padding:2px 4px;
}
.brand.on{
    background: red;
    color: white;
}
.brand:hover, .color:hover, .sort-item:hover{
    background: #e0e0e0;
}
</style>