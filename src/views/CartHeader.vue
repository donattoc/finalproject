<template>
  <div>
    <header>
           {{cart.length}} in cart
           <br>
      <button v-on:click="navigateTo('products')">View products</button>
      <div class="divider"/>
      <button v-on:click="navigateTo('cart')">View Cart</button>
    </header>

    <div v-if="page === 'cart'">
      <ShoppingCart v-on:removeItemFromCart="removeItemFromCart" :cart="cart" />
    </div>

    <div v-if="page === 'products'">
      <ProductsList v-on:addItemToCart="addItemToCart" />
    </div>
  </div>
</template>

<script>
import ProductsList from "@/components/ProductsList.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
export default {
  name: "CartHeader",
  data: () => {
    return {
      page: "shop",
      cart: []
    };
  },
  methods: {
    addItemToCart(product) {
      this.cart.push(product);
    },
    removeItemFromCart(product) {
      this.cart.splice(this.cart.indexOf(product), 1);
    },
    navigateTo(page) {
      this.page = page;
    }
  },
  components: { ProductsList, ShoppingCart }
};
</script>

<style>
body {
  margin: 0;
}
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.products button {
  padding: 10px;
  background-color: black;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 10px;
}
.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
</style>

<style scoped>
header {
  height: 70px;
   background: #9597DB;
    background: linear-gradient(to bottom,  #A095CC,  #6588DB);
    color: #FFF;
  text-align: right;
  font-size: 25px;
  padding-right: 25px;
}
header button {
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: white;
  background-color: rgb(50, 45, 58);
}
.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
</style>