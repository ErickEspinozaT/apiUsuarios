const firebase = require('../config/firebase');
const client = require('../config/firebase-client');

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    let auth = await client.auth().signInWithEmailAndPassword(email, password);
    let token = { token: auth.user.toJSON().stsTokenManager.accessToken }
    let { uid } = await firebase.auth().verifyIdToken(token.token);
    let user = await firebase.database().ref(`/users/${uid}`).once('value');
    res.locals.user = user.val();
    res.json({ user: res.locals.user });
  } catch(error) {
    res.json(error.message);
  }
};

module.exports = {
  authenticate
};