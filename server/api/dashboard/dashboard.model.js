'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  name: {
    type: Number,
    set: toNumber
  },
  latitude: {
    type: Number,
    set: toNumber
  },
  longitude: {
    type: Number,
    set: toNumber
  },
  apiNumber: {
    type: Number,
    set: toNumber
  },
  operator: String,
  status: String,
  rsvCat: String,
  latLength: {
    type: Number,
    set: toNumber
  },
  stages: {
    type: Number,
    set: toNumber
  },
  fpd: {
    type: Date,
    default: Date.now,
    set: function (fpd){
      if(!fpd) return fpd;
      return new Date(fpd).toISOString();
    }
  } ,
  oil: {
    type: Number,
    set: toNumber
  },
  gas: {
    type: Number,
    set: toNumber
  },
  water: {
    type: Number,
    set: toNumber
  }
});

function toNumber(str){
  if(!str) return 0;
  return Number(str);
}
module.exports = mongoose.model('Dashboard', DashboardSchema);