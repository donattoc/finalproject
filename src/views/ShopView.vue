<template>
  <div>
    <header>
      <button v-on:click="navigateTo('productsList')">View products</button>
      {{CartList.length}} in CartList
      <button v-on:click="navigateTo('CartList')">View Cart</button>
      <button v-on:click="saveCart">Save Cart</button>
    </header>

    <div v-if="page === 'CartList'">
      <CartList v-on:removeItemFromCart="removeItemFromCart" :CartList="CartList" />
    </div>

    <div v-if="page === 'productsList'">
      <productsList v-on:addItemToCart="addItemToCart" />
    </div>
  </div>
</template>

<script>
import productsList from "@/components/productsList.vue";
import CartList from '@/components/CartList.vue';
import { doc, updateDoc, arrayUnion, arrayRemove, DocumentReference, setDoc, collection, addDoc, CollectionReference, deleteField, getDocs, query, where, QuerySnapshot, QueryDocumentSnapshot, deleteDoc, DocumentSnapshot, getDoc, onSnapshot, DocumentChange, FieldValue } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  terminate,
  waitForPendingWrites,
} from "firebase/firestore";
import { db }  from "@/myconfig";
import {
  Auth,
  getAuth,
 
} from "firebase/auth";
const auth = getAuth();
const mydb = getFirestore();
export default {
  name: "ShopView",
  data: () => {
    return {
      page: "productsList",
      CartList: [],

    }
  },
   mounted() {
           this.auth = getAuth();

  },
  methods: {
       navigateTo(page) {
      this.page = page;
    },
    addItemToCart(productsList) {
      this.CartList.push(productsList);
      let p = {...productsList}
      console.log(p)
      db.collection('cart').doc(`${productsList.id}`).set(p,{merge:true})

    },
    saveCart() {
      const proms = this.productsList.filter((p) => {
       const auth = getAuth();
const userId = auth.currentUser?.uid;
 const dx = doc(db, `${userId}/${p.name}`);
 return setDoc(dx, {product: p.name});
 });
Promise.all(proms).then(() => {
 console.log("Batch inserts done");
})
.catch((err) => { "Error" });
}
   
    },
    removeItemFromCart(productsList) {
      this.CartList.splice(this.CartList.indexOf(productsList), 1);
      db.collection('userId').doc(`${productsList.name}`).delete()
       productsList.filter((p) => {
        if (productsList.name == p.id) {
          p.CartList = false;
        }
       
  })},
  components: { productsList, CartList}
  }


</script>

<style>
body {
  margin: 0;
}
.products {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.products button {
  padding: 10px;
  background-color: black;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>

<style scoped>
header {
  height: 60px;
  box-shadow: 2px 2px 5px blue;
  background-color: pink;
  text-align: right;
  font-size: 30px;
  padding-top: 20px;
}
header button {
  padding: 10px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: green;
}
</style>