var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');
var randomstring = require('randomstring');


//geocoder setup
var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);
router.post('/find', function (req, res) {
  var userId = req.user.id;
  var username = req.user.username;
  var limit = parseInt(req.body.limit);
  var searchTerm = req.body.location;
    geocoder.geocode({address:searchTerm, minConfidence: 0.5, limit: 5}, function(err, res) {
  })
  .then(function (location) {
    stateLong = location[0].administrativeLevels.level1long;
    stateShort = location[0].administrativeLevels.level1short;

      Event.find({
        $and :[{createdby:userId},
          {$or:[{location:{$regex:stateLong,$options:"$i"}},
                {location:{$regex:stateShort,$options:"$i"}},
                
              ]},
        ]
      })
      .populate('places')
      .populate('attendees')
      .limit(limit)
      .then(function (data) {
        res.send(data);
      })
  });
})

router.post('/all', function (req, res) {
  var userId = req.user.id;
  var username = req.user.username;
  var limit = parseInt(req.body.limit);
  Event.find({createdby:userId})
  .populate('places')
  .populate('attendees')
  .limit(limit)
  .then(function (data) {
    console.log(data)
    res.send(data);
  })
})


function findbyLocation (userId, limit, stateLong, stateShort) {
  Event.find({
    $and :[{createdby:userId},
      {$or:[{location:{$regex:stateLong,$options:"$i"}},
            {location:{$regex:stateShort,$options:"$i"}},]},
    ]
  })
  .populate('places')
  .populate('attendees')
  .limit(limit)
  .then(function (data) {
    res.send(data);
  })
}

function findAllAndPopulate (userId, limit) {
  Event.find({createdby:userId})
  .populate('places')
  .populate('attendees')
  .limit(limit)
  .then(function (data) {
    console.log(data)
    res.send(data);
  })
}

module.exports = router;
