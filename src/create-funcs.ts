import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from "firebase/firestore";
import {
  Auth,
 
} from "firebase/auth";

const states = [
  {
    abbrev: "AL",

    name: "Alabama",
    capital: "Montgomery",
  },
  { abbrev: "AZ", name: "Arizona", capital: "Phoenix" },
  { abbrev: "CA", name: "California", capital: "Sacramento" },
];

const timeZones = [
 
  {  name: "A", timeZone: "TA" },
  { name: "B", timeZone: "TB" },
  {  name: "C", timeZone: "TC" },
  { name: "D", timeZone: "TD" },
  {  name: "E", timeZone: "TE" },
  { name: "F", timeZone: "TF" },
];

function addSingleDoc(db: Firestore,timeZones:any,auth:Auth) {
  // Use filesystem syntax for document path
  const userId = auth.currentUser?.uid;
  const il_doc: DocumentReference = doc(db, "users/"+userId);
  // Add a new document with our own id (IL)
  setDoc(il_doc, {
  }).then(() => {
    addTimeZone(db,timeZones,auth)
  });
  

 

 
}

function addMultipleDocsWithPromise(db: Firestore) {
  // Option #1: Use Promise.all
  const proms = states.map(
    (z: { abbrev: string; name: string; capital: string }) => {
      const d = doc(db, "states", z.abbrev);
      return setDoc(d, { name: z.name, capital: z.capital });
    }
  );
  Promise.all(proms).then(() => {
    console.log(`Done inserting ${states.length} docs to Firestore`);
  });
}

function addMultipleDocsWithAwait(db: Firestore) {
  states.forEach(
    async (z: { abbrev: string; name: string; capital: string }) => {
      const d = doc(db, "states", z.abbrev);
      await setDoc(d, { name: z.name, capital: z.capital });
    }
  );
}

function addTimeZone(db: Firestore,timeZones:any,auth:Auth) {

  console.log("I am called");
  const uid = auth.currentUser?.uid;
  
  if(uid!=null)
   {
    const michCities = collection(db, "users", uid, "cities");
   
  
   timeZones.forEach(
      async (z: { name: string; timeZone: string;}) => {
        await addDoc(michCities, { name: z.name, timeZone: z.timeZone });
      }
    );
   
  }
  
}



function addDocInSubCollection(db: Firestore) {
  const michCities = collection(db, "states", "MI", "cities");
  addDoc(michCities, {
    name: "Grand Rapids",
    lat: 42.963795,
    lon: -85.670006,
  });
  addDoc(michCities, {
    name: "Lansing",
    lat: 42.732536,
    lon: -84.555534,
  });
  addDoc(michCities, {
    name: "Detroit",
    lat: 42.331429,
    lon: -83.045753,
  });
  const GR = doc(db, "states", "MI", "cities", "GRR");
  setDoc(GR, { name: "Grand Rapids", lon: -85.670006, lat: 42.963795 });
}

export function run(db: Firestore,timeZones:any,auth:Auth) {
  console.log(timeZones.length)
   addSingleDoc(db,timeZones,auth);
 
}
