"use strict";

var User = require('../models/user');

var jwt = require('jsonwebtoken');

exports.create = function (req, res) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }).then(function (user) {
    res.status(201).send(user);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.login = function (req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, 'id name').then(function (user) {
    if (!user) {
      res.status(422).send({
        message: 'Auth Failed'
      });
    } else {
      var secret = 'secret';
      var token = jwt.sign({ //encoding the token for 1 year
        uid: user.id
      }, secret, {
        expiresIn: '1y',
        algorithm: 'HS256'
      });
      res.status(200).send({
        token: token,
        user: user
      });
    }

    res.status(200).send(user);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};