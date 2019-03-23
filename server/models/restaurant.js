"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  restaurantID: {
    type: String,
		unique: true,
    require: true,
    trim: true,
    max: 10,
  },
	name: {
    type: String,
    require: true,
    trim: true,
    max: 100
  },
  cost: {
    type: Number,
    require: true
  },
	cuisines: {
		type: String,
    require: true,
    trim: true,
    max: 100
	},
	currency: {
    type: String,
    require: true,
    trim: true,
    max: 40
  },
	booking: {
		type: Boolean
	},
	delivery: {
		type: Boolean
	},
  rating: {
    type: Number,
    require: true,
    max: 5,
		min: 0
  },
	voters: {
		type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}); // Export the model

module.exports = mongoose.model('restaurants', RestaurantSchema);