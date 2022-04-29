<template>
  <div class="shop">
    <h2>This is the shop page. I got here via {{byWayOf}}</h2>
    <cart-header/>
  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartHeader from "../views/CartHeader.vue";

@Component({
  components: {
    CartHeader
},
})
export default class ShopView extends Vue {}

</script>

<style scoped>

</style>
