import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC9Gf2yGGZRrObQ0nkZamarKA04cuQ4SRE",
  authDomain: "kitchen-buddy-d8856.firebaseapp.com",
  databaseURL: "https://kitchen-buddy-d8856-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kitchen-buddy-d8856",
  storageBucket: "kitchen-buddy-d8856.appspot.com",
  messagingSenderId: "1070597987786",
  appId: "1:1070597987786:web:4e3d3bb52479e675f58333",
  measurementId: "G-HQYEERL3D7"
};

const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const db = app.database();