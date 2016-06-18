var Promise = require('bluebird')
var mongoose = Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var attendeeSchema = new Schema({
  // name: String,
  phone: String,
  // attendees: String,
  event: {type:Schema.Types.ObjectId, ref:'Event'}
})


var Attendee = mongoose.model('Attendee', attendeeSchema);
module.exports = Attendee;
