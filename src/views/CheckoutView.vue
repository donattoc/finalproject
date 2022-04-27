<template>
  <div class="Checkout">
    <h2>This is the checkout page. I got here via {{byWayOf}}</h2>
    <shopping-cart />
  </div>
  

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ShoppingCart from "@/components/ShoppingCart.vue";
import "@fontsource/alike-angular";

@Component({
  components: {
    ShoppingCart,
  },
})
export default class CheckOut extends Vue {}
</script>