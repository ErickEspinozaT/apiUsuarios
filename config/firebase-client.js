const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyBo95FKWhoCpmrDJJ_ESByDX0kAh-kyNEQ",
  authDomain: "testing-1370.firebaseapp.com",
  databaseURL: "https://testing-1370.firebaseio.com",
  projectId: "testing-1370",
  storageBucket: "testing-1370.appspot.com",
  messagingSenderId: "403392127029"
};

const client = firebase.initializeApp(config);
module.exports = client;