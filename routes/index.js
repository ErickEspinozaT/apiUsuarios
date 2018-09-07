const Router = require('express').Router;
const SudoRoutes = require('./sudo.routes');
const AuthRoutes = require('./auth.routes');

class Routes {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.use('/sudo', new SudoRoutes().router);
    this.router.use('/auth', new AuthRoutes().router);
  }
}

module.exports = Routes;