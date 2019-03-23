"use strict";

var userController = require('../controllers/user');

var restaurantsController = require('../controllers/restaurant');

var authChecker = require('../utils/auth');

var userValidator = require('../validator/user');

module.exports = function (app) {
  //users
  app.post('/api/register', userValidator.create, userController.create);
  app.post('/api/login', userValidator.login, userController.login);
  
	app.post('/api/restaurants', restaurantsController.create);
	app.get('/api/restaurants', restaurantsController.list);
};