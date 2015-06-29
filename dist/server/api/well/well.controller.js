'use strict';

var Well = require('./well.model');
var config = require('../../config/envirnoment');
var jwt = require('jsonwebtoken');

exports.list = function (req, res) {
	Well.find({}, function (err, wells) {
		res.json(wells);
	});
}

exports.update = function(req, res) {
	var well = new Well (req.body);
	Well.update({ _id: well.id }, {totalOil: well.totalOil}, function (err, numberAffected, raw) {
		var socket
	})
}