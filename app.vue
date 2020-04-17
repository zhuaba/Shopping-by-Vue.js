<template>
    <div>
        <div class="header">
            <router-link to="/list" class="header-title">电商网站示例</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    购物车
                    <span v-if="cartListNum" class="header-menu-num">{{cartListNum}}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    computed: {
        cartListNum() {
            return this.$store.state.cartList.length;
        }
    }
}
</script>