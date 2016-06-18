var Promise = require('bluebird')
var mongoose = Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var eventSchema = new Schema ({
  name:{
    type: String,
    require: true
  },
  location:{
    type: String,
    require: true
  },
  phone:{
    type: String,
  },
  searchLat:{
    type: String
  },
  searchLng:{
    type: String
  },
  places:[{type:Schema.Types.ObjectId, ref: "Place"}],
  time:{
    type: String,
  },
  date:{
    type: Date,
  },
  results: [],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdby:{type:Schema.Types.ObjectId, ref:"User"},
  attendees:[{type:Schema.Types.ObjectId, ref:"Attendee"}],
  eventUrl:String
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
