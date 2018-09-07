const admin = require('firebase-admin');
const CREDENTIALS = require('./credentials.json');

const firebase = admin.initializeApp({
  credential: admin.credential.cert(CREDENTIALS),
  databaseURL: "https://testing-1370.firebaseio.com"
});

module.exports = firebase;