<template>
  <div>
    <p>This sample requires an API Key from <a
        href="https://timezonedb.com">TimeZoneDB</a>.
      Once you sign up and get your API key, save it in
      <code>.env.local</code> (in the same directory with
      <code>package.json</code>) in the following format:

    <pre>
        VUE_APP_TIMEZONE_API_KEY=xxxxxxxx
    </pre>
    </p>

    <div>
      <WorldMapExport @map-clicked="what" />
    </div>
    <input type="text" :value="geoPosition">
    <button @click="searchCity">Add</button>
    <button @click="getCities">Get Saved Cities</button>
    <button @click="saveCity">Save City</button>
   

    <div id="clocks" v-for="(c,pos) in selectedCities" :key="pos.index">
        
      <WorldClockExport
        :time-zone="c.timeZone" :label="c.name">
      </WorldClockExport>
      <button @click="deleteCity2(pos)">Delete</button>
      

    </div>

  </div>
</template>

<script lang="ts">
// import ChildComponent from "./60-props-child.vue";
import axios, { AxiosResponse } from "axios";
import WorldClockExport from "./WorldClock.vue";
import WorldMapExport from "./WorldMap.vue";
import { doc, updateDoc, arrayUnion, arrayRemove, DocumentReference, setDoc, collection, addDoc, CollectionReference, deleteField, getDocs, query, where, QuerySnapshot, QueryDocumentSnapshot, deleteDoc, DocumentSnapshot, getDoc, onSnapshot, DocumentChange, FieldValue } from "firebase/firestore";
import { Vue, Component } from "vue-property-decorator";


import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  terminate,
  waitForPendingWrites,
} from "firebase/firestore";
import { app, db} from '../myconfig';
import { run as createOp } from "../create-funcs";


import {
  Auth,
  getAuth,
 
} from "firebase/auth";
import { ZonedDateTime } from "@js-joda/core";
// import { run as readOp } from "./read-funcs";
// import { run as updateOp } from "./update-funcs";
// import { run as deleteOp } from "./delete-funcs";
// import { listen } from "./listener-funcs";
console.log("Create Firebase App", app.name);
const timezoneDBUrl = "http://api.timezonedb.com/v2.1";

const auth = getAuth();
const userId = auth.currentUser?.uid;



type City = {
  name: string;
  timeZone: string;
};

type TimeZoneData = {
  countryName: string;
  gmtOffset: number;
  regionName: string;
  zoneName: string;
};
@Component({ components: { WorldMapExport, WorldClockExport, } })
export default class WorldTimeExport extends Vue {
  geoPos: { lat?: number; lng?: number } = {};
  selectedCities: Array<City> = [];
  apiKey = "";
  auth: Auth | null = null;
  mounted(): void {
    this.apiKey = process.env.VUE_APP_TIMEZONE_API_KEY;
    this.auth = getAuth();
    this.getCities();
  }
  get geoPosition(): string {
    if (this.geoPos.lat && this.geoPos.lng)
      return `${this.geoPos.lat.toPrecision(5)},${this.geoPos.lng.toPrecision(
        5
      )}`;

    else return "N/A";
  }

  searchCity(): void {
    const param = new URLSearchParams();
    param.append("key", this.apiKey);
    param.append("format", "json");
    param.append("by", "position");
    param.append("lat", this.geoPos.lat!.toString());
    param.append("lng", this.geoPos.lng!.toString());
    const tzUrl = `${timezoneDBUrl}/get-time-zone?` + param.toString();
    // Use a Web Proxy Server to get around CORS issue
    // since timezonedb.com does not allow CORS
    axios
      .request({
        method: "GET",
        url: "https://api.allorigins.win/get",
        params: {
          url: tzUrl,
        },
      })
      .then((r: AxiosResponse) => {
        return r.data;
      })
      .then((r: any) => JSON.parse(r.contents))
      .then((r: TimeZoneData) => {
        // Add the selected location to our array
        if (this.selectedCities.some(unique => unique.name === r.regionName)) {
          console.log("error duplicate");
        } else {
          this.selectedCities.push({ name: r.regionName, timeZone: r.zoneName});
        }})
  }

   saveCity(): void {
     const auth = getAuth();
const userId = auth.currentUser?.uid;
    // createOp(db, this.selectedCities, auth);
const proms = this.selectedCities.filter((c:City) => {
 const dx = doc(db, `${userId}/${c.name}`);
 return setDoc(dx, {city: c.name, timeZone: c.timeZone});
 });
Promise.all(proms).then(() => {
 console.log("Batch inserts done");
})
.catch((err:any) => { "Error" });
} 
   



//get data on firestore

getCities() {
  const auth = getAuth();
const userId = auth.currentUser?.uid;
  const timeColl = collection(db, `${userId}`);
getDocs(timeColl)
    .then((cQuery: QuerySnapshot) => {
      cQuery.forEach((cCity: QueryDocumentSnapshot) => {
      console.log("From Firestore: ", cCity.data());
      let data = cCity.data();
   this.selectedCities?.push({name: data.city, timeZone: data.timeZone})
      })
    })
}
      

/*   async deleteCity(): Promise<void> {
  // Delete a specific document
const reference = doc(db, `${userId}`);
var removed = this.selectedCities.splice(0,1); 

//const res = await updateDoc(reference, {
 // city: deleteField(),
  //timeZone: deleteField()
  updateDoc(reference, { "city": deleteField(), "timeZone": deleteField() });
//deleteDoc(doc(db, `users/${userId}/${this.selectedCities[pos].name`))
} */

deleteCity2(index: number) {
  const auth = getAuth();
const userId = auth.currentUser?.uid;
  this.$delete(this.selectedCities, index);
  deleteDoc(doc(db, `${userId}/${this.selectedCities[index].name}`));
}


  what(geoPos: { lat: number; lng: number }): void {
    // When the user pans the map left/right the longitude
    // angle can be out of the [-180,+180] range
    while (geoPos.lng > 180) geoPos.lng -= 360;
    while (geoPos.lng < -180) geoPos.lng += 360;
    this.geoPos = { ...geoPos };

  }

  
}





</script>

<style scoped>
#clocks {
  margin-top: 1em;
}
pre {
  white-space: normal;
  padding: 0.5em;
  border: 2px solid gray;
}




</style>