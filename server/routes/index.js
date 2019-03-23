"use strict";

var userController = require('../controllers/user');

var restaurantsController = require('../controllers/restaurant');

var authChecker = require('../utils/auth');

module.exports = function (app) {
  //users
  app.post('/api/register', userController.create);
  app.post('/api/login', userController.login);
  
	app.post('/api/restaurants', restaurantsController.create);
	app.get('/api/restaurants', restaurantsController.list);
};