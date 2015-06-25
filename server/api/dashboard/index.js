'use strict';

var express = require('express');
var controller = require('./dashboard.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/',controller.create); 
//  auth.isAuthenticated(), 
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;