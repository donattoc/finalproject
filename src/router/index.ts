import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";
import SellView from "../views/SellView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import Profile from "../views/ProfileView.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: 
      LoginView,
  },
  {
      path: '/',
      name: "home",
      component: 
    HomeView
  
  },
      {
      path: '/shop',
      name: "shop",
      component: 
      ShopView,
      },
      {
      path: '/sell',
      name: "sell",
      component: 
  SellView
  },
  {
    path: '/checkout',
    name: "checkout",
    component:
    CheckoutView
  },
  {
    path: '/profile',
    name: "profile",
    component: 
    Profile
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
