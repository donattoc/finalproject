<template>
  <div class="home">
    <h2> Welcome to The Silk Road, your number one place for finding the most luxurious silks </h2>
    <p id="text">  When looking for silk sheets, you'll want to search for the best quality available. 
      <br> <br> On The Silk Road, we only use top-quality mulberry silk. </p>
    <div class="images">
    <img :src="image2" >
    <img :src="image">
  </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WorldTimeExport from "vue-class-component";
import {
  getAuth,
  onAuthStateChanged,
  User,
  Auth,
  signOut,
  deleteUser,
} from "firebase/auth";
@Component({
  components: {
    WorldTimeExport,
  },
})
export default class HomeView extends Vue {
  @Prop() readonly byWayOf!: string;
  userPhotoURL = "";
  auth: Auth | null = null;
  userInfo = "";
  mounted(): void {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user: User | null) => {
      console.log("Auth changed", user);

      if (user) {
        this.userPhotoURL = user.photoURL ?? "";
        this.userInfo = `${user.displayName ?? "No Name"}`;
      }
    });
  }
  data () {
  return {
    image: require('@/assets/goldsilk.png'),
    image2: require('@/assets/greensilk.png')
  }
}
}
</script>

<style scoped>

img {
  height: 500px !important;
  
}
.home {
  text-align: center;
  padding: 25px !important;
}

h2 {
  font-size: 40px;
}

p {
  font-size: 25px;
  font-family: 'Times New Roman' cursive, Times, serif;
}
</style>