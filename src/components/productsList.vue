<template>
  <div>
    <h1>Products List</h1>
    <div class="productsList">
      <div v-for="(productsList, index) in productsList" :key="index">
        <h3>{{productsList.name}}</h3>
        <div class="cost">{{productsList.cost}}</div>
        <button v-on:click="addItemToCart(productsList)">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      productsList: [
        {
          name: "Black Silk",
          cost: "$59.99",
           
        },
                {
          name: "White Silk",
          cost: "$59.99",
           
        },
                {
          name: "Gold Silk",
          cost: "$59.99",
           
        },
      ]
    };
  },
  methods: {
    addItemToCart(productsList) {
      this.$emit("addItemToCart", productsList);
    }
  }
};
</script>

<style>
</style>