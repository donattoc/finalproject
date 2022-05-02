<template>
  <div>
    <h1>Your Cart</h1>
    <div class="productsList">
      <div v-for="(productsList, index) in CartList" :key="index">
        <h3>{{productsList.name}}</h3>
        <div>{{productsList.cost}}</div>
        <button v-on:click="removeItemFromCart(productsList)">Remove from cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["CartList"],
  methods: {
    removeItemFromCart(productsList) {
      this.$emit("removeItemFromCart", productsList);
    }
  }
};
</script>

<style>
</style>