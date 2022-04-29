<template>
  <div class="profile">
      <div class="container">
        <h3>Profile settings</h3>
        <p>Change your profile settings here</p>
    <p>Welcome, {{userInfo}}</p>
    <img id="profilepic" :src="userPhotoURL" v-if="userPhotoURL.length > 0" width="64">
    <br>
      </div>
    <button id="logout" @click="outtahere">Logout</button>
    <world-time-export></world-time-export>
      
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
export default class ProfileView extends Vue {
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

  outtahere(): void {
    if (this.auth) signOut(this.auth);

    // Back to the previous page
    this.$router.push({path: '/Login'});
  }
  
deleteAcc(): void {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if(currentUser !== null){
    deleteUser(currentUser).then(this.returnHome);
  }
  else{
    console.log("error");
  }
  }

  returnHome(): void {
    this.$router.push({ path: "/" });
  }
}
</script>

<style scoped>

img {
 height: 50% !important;
 width: 10%;
align-content: center;
}

#logout {
  font-size: 50px;
    margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.container {
  text-align: center;
  font-size: larger;
}
</style>