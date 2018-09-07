const Router = require('express').Router;
const { authenticate } = require('../controllers/auth.controller');

class AuthRoutes {
  constructor() {
    this.router = Router();
    this.config();
  }

  config() {
    this.router.post('/', authenticate);
  }

  test(req, res) {
    res.json();
  }
}

module.exports = AuthRoutes;