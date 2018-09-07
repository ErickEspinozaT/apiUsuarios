const firebase = require('../config/firebase');

const crearCuenta = async (req, res, next) => {
  const uid = req.user.uid;
  try{
    let account = { accountNumber: Date.now(),
      saldo: 300,
      retiros: [{date: '', monto: 0}],
      despositos: [{date: '', monto: 0}]
    }
    await firebase.database().ref(`/account/${uid}`).set(account);
    await firebase.database().ref(`/users/${uid}`).set(req.user);
    return firebase.database().ref(`/users/${uid}/account`).update(account);
  } catch(error) {
    res.json(error);
  }
}


// const consultarCuenta = async (req, res, next) => {
//   const uid = req.params.uid;
//   console.log(uid)
//   try {
//     let snapshot = await firebase.database().ref(`users/${uid}`).once('value');
//     const users = snapshot.val();
//     res.json({users});
//   } catch(error) {
//     res.json(error.message);
//   }
// }
module.exports = { crearCuenta };