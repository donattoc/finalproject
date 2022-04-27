<template>
  <div id="app">
  <nav id="navbar2">
        <router-link class="navbar-brand" to="/" id="brand" >The Silk Road</router-link>
       <ul class="nav-item">
      <router-link to="/">Home</router-link> </ul>
      <ul class="nav-item">

      <router-link to="/login">Login</router-link> </ul> 
      <ul class="nav-item">

      <router-link to="/shop">Shop</router-link> </ul> 
      <ul class="nav-item">

      <router-link to="/checkout">Checkout</router-link> </ul>
       <ul class="nav-item">

      <router-link to="/profile">Profile</router-link> </ul>
     </nav>
     

    <transition name="shrink-explode">
<router-view class="view one"></router-view>
    </transition>
  </div>
  

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "@fontsource/alike-angular";

@Component({
  components: {

  },
})
export default class App extends Vue {}
</script>



<style>
#app {
  font-family: 'Alike Angular', 'Times New Roman', 'Arial';
  padding-top: 50px;

}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: .5rem;
}
.shrink-explode-leave-active,
.shrink-explode-enter-active {
  transition-property: all;
  transition-duration: 500ms;
  transform-origin: 0 0;
}

.shrink-explode-leave {
  /* transform: scale(100%); */
}
.shrink-explode-leave-to {
  transform: scale(50%);
}
.shrink-explode-enter {
  transform: scale(50%);
}
.shrink-explode-enter-to {
  /* transform: scale(100%); */
}
#navbar2 {
  width: 100%;
 background: #9597DB;
    background: linear-gradient(to bottom,  #A095CC,  #6588DB);
    color: #FFF;
  height: 40px;
  padding-left: 10px;
    border-radius: 0px;
  position: fixed;
  display: inline-flex;
  text-align: center;
  z-index: 200;
 left: 0;
 top: 0; 
 
}
#navbar2 a {
    display: flex;
    line-height: 20px;
    padding: 0 50px;
    text-decoration: none;
    color: #FFFFFF;
    font-size: 20px;
}


a#brand {
  padding-top: 10px;
  font-size: 30px;
  padding-right: 650px;
  display: flex;
}
</style>
