'use strict';

var _ = require('lodash');
var Dashboard = require('./dashboard.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');


//Requiring the json file
var Data = require('../../data.json');
//convert json file to string
var jsonVar = JSON.stringify(Data);


// Get list of dashboards
exports.index = function(req, res) {
  Dashboard.find(function (err, dashboards) {
    if(err) { return handleError(res, err); }
    //print the json data to console each time that we visit admin panel.
    console.log("Here is the data: " + jsonVar);
    return res.json(200, dashboards);
  });
};

// Get a single dashboard
exports.show = function(req, res) {
  Dashboard.findById(req.params.id, function (err, dashboard) {
    if(err) { return handleError(res, err); }
    if(!dashboard) { return res.send(404); }
    return res.json(dashboard);
  });
};

// Creates a new dashboard in the DB.
exports.create = function(req, res) {

  if(!req.body || req.body && !(_.isArray(req.body.chartsData))) return res.status(400).send({error: 'Data not present'});
  var chartsData = req.body.chartsData;

  Dashboard.remove(function(err) {
    if(err) { return handleError(res, err); }
    Dashboard.create(chartsData, function(err, dashboard) {
      if(err) { return handleError(res, err); }
      return res.json(201, dashboard);
    });

  });

};

// Updates an existing dashboard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dashboard.findById(req.params.id, function (err, dashboard) {
    if (err) { return handleError(res, err); }
    if(!dashboard) { return res.send(404); }
    var updated = _.merge(dashboard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dashboard);
    });
  });
};

// Deletes a dashboard from the DB.
exports.destroy = function(req, res) {
  Dashboard.findById(req.params.id, function (err, dashboard) {
    if(err) { return handleError(res, err); }
    if(!dashboard) { return res.send(404); }
    dashboard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}