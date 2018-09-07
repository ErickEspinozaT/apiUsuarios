const firebase = require('../config/firebase');
const { crearCuenta } = require('../controllers/user.controller')

const addToFirebase = async ({ email, password, firstName, lastName, userType, cIdentidad }) => {
  let { uid } = await firebase.auth().createUser({ email, password });
  const user = { uid, email, firstName, lastName, userType, cIdentidad };
    if (user.userType === 'socio') {
      return crearCuenta({user});
    }
  return firebase.database().ref(`/users/${uid}`).set(user);
}

const crearUser = async (req, res) => {
  const { userType } = req.body;
  try {
    if (userType !== 'admin' && userType !== 'socio') {
      throw 'Must pass type of: admin or socio';
    }
    await addToFirebase(req.body);
    res.json({ message: 'success' });
  } catch(error) {
    res.status(403).json( {error} );
  }
}

const crearSudo = async (req, res) => {
  const { userType, email, password, firstName, lastName} = req.body;
  try {
    if (userType !== 'sudo') {
      throw 'Accesso denegado';
    }
    let { uid } = await firebase.auth().createUser({ email, password });  
    await firebase.database().ref(`/users/${uid}`).set({userType, email, firstName, lastName});
    // delete sudo;
    res.json({ message: 'success' });
  } catch(error) {
    res.status(403).json( {error} );
  }
}

const modificarUser = async (req, res) => { 
  const { uid, email, password, firstName, lastName } = req.body;
  const user = { firstName, lastName, email };
  try {
    const updated = await firebase.auth().updateUser(uid, { firstName, lastName, email, password })
    await firebase.database().ref(`/users/${uid}`).update(user);
    res.json({ updated });
  } catch(error) {
    res.status(403).json( {error} );
  }
}

const consultarUsers = async (req, res, next) => {
  try {
    let snapshot = await firebase.database().ref(`users`).once('value');
    const users = snapshot.val();
    res.json({users});
  } catch(error) {
    res.status(403).json({ error });
  }
}

const consultarUser = async (req, res, next) => {
  const uid = req.params.uid;
  console.log(uid)
  try {
    let snapshot = await firebase.database().ref(`users/${uid}`).once('value');
    const users = snapshot.val();
    res.json({users});
  } catch(error) {
    res.json(error.message);
  }
}

const eliminarUser = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    let snapshot = await firebase.database().ref(`users/${uid}`).once('value');
    
    const user = snapshot.val();
      if( user.userType != 'sudo' ){
        await firebase.database().ref(`users/${uid}`).remove();
        await firebase.auth().deleteUser(uid);
        res.json({message: 'Usuario Eliminado'});
      } else { res.json({message: 'No puede eliminar sudo'}); }
  } catch(error) {
    res.json(error.message);
  }
}

module.exports = {
  crearSudo,
  crearUser,
  consultarUser,
  consultarUsers,
  modificarUser,
  eliminarUser
};