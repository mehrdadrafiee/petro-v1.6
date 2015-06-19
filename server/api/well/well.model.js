'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WellSchema = new Schema({
	name: String,
	latitude: Number,
	longitude: Number,
	apiNumber: Number,
	operator: String,
	status: String,
	rsvCat: String,
	latLength: Number,
	stages: Number,
	date: { type: Date, default: Date.now }
	totalOil: Number,
	totalGas: Number,
	totalWater: Number;
})

module.exports = mongoose.model('Well', WellSchema);