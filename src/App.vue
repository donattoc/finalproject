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

      <router-link to="/profile">Profile</router-link> </ul>
     </nav>


    <transition name="shrink-explode">
<router-view class="view one"></router-view>
    </transition>
  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {


  },
})
export default class App extends Vue {}
</script>



<style>
#app {
  font-family: 'Alike Angular', 'Times New Roman', 'Arial';
  padding-top: 40px;
  display: block !important;
  width: 100% !important;

}

#navbar2 a.router-link-exact-active {
  color: whitesmoke;
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
nav {
  width: 100%;
 background: #9597DB;
    background: linear-gradient(to bottom,  #A095CC,  #6588DB);
    color: #FFF;
  height: 40px;
  padding-left: 10px;
    border-radius: 0px;
  position: fixed;
  display: -webkit-inline-box;
  text-align: center;
  z-index: 200;
 left: 0;
 top: 0; 
 
}
#navbar2 a {
    display: flex;
    line-height: 20px;
    text-decoration: none;
    color: #FFFFFF;
    font-size: 20px;
    width: 25%;
    padding-right: 25px;

}
a#brand {
  padding-top: 10px;
  font-size: 30px;
  display: flex;
     line-height: 20px;
   width: 75%;

}
</style>
