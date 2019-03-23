"use strict";

var Restaurants = require('../models/restaurant');

exports.create = function (req, res) {
  Restaurants.create({
    restaurantID: req.body.restaurantID,
    name: req.body.name,
    cost: req.body.cost,
		cuisines: req.body.cuisines,
    currency: req.body.currency,
		booking: req.body.booking,
		delivery: req.body.delivery,
		rating: req.body.rating,
		voters: req.body.voters
  })
	.then(function (restaurant) {
    res.status(201).send(restaurant);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

exports.list = function (req, res) {
	var filterList = {}
	
	if(req.query.name)
		filterList['name'] = { $regex: req.query.name, $options: 'i'};
	
	if(req.query.cuisines)
		filterList['cuisines'] = { $regex: req.query.cuisines, $options: 'i'};
	
	if(req.query.booking)
		filterList['booking'] = req.query.booking
	
	if(req.query.delivery)
		filterList['delivery'] = req.query.delivery
	
	if(req.query.lowerCost && req.query.upperCost)
		filterList['cost'] = {$gte: req.query.lowerCost, $lte: req.query.upperCost}
	
	var sortingType = {}
	if(req.query.sorting === "cost-low-high")
		sortingType['cost'] = '1'
	else if(req.query.sorting === "cost-high-low")
		sortingType['cost'] = '-1'
	else if(req.query.sorting === "rating-high-low")
		sortingType['rating'] = '-1'
	else if(req.query.sorting === "votes-high-low")
		sortingType['voters'] = '-1'
	Restaurants.find(filterList)
	.sort(sortingType)
	.then(function (restaurants) {
    res.status(200).send(restaurants);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};
