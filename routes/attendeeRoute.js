var express = require('express');
var router = express.Router();
var Event = require('../models/Event.js');
var Attendee = require('../models/Attendee.js')


router.get('/create', function (req, res) {
  var name = req.body.name;
  var phone = req.body.phone;
  var event = req.body.event;
  console.log(req.body)
  Attendee.saveAsync({name:name,phone:phone,event:event}, function (err, attnedee) {
    if (err) {
      console.log(err)
    }
    res.send(attendee)
  })
})
module.exports = router;
