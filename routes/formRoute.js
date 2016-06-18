var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');
var randomstring = require('randomstring');


router.post('/form', function (req, res) {
  res.send('HIHIHIHI');
})



module.exports = router;
