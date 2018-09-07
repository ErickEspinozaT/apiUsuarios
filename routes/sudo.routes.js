const Router = require('express').Router;
const { crearSudo, crearUser, consultarUser, consultarUsers, modificarUser ,eliminarUser } = require('../controllers/sudo.controller');

class SudoRoutes {
  constructor() {
    this.router = Router();
    this.config();
  }
  config() {
    this.router.post('/createSudo', crearSudo);
    this.router.get('/getUser', consultarUsers);
    this.router.get('/getUser/:uid', consultarUser);
    this.router.put('/updateUser', modificarUser);
    this.router.post('/createUser', crearUser);
    this.router.delete('/deleteUser/:uid', eliminarUser);
  }
}

module.exports = SudoRoutes;