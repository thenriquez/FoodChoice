var accountSid = 'ACac2c80a08f5af3c721cd57508e22402c';
var authToken = "c97605c687ac79e81f300c94ea317d40";
var client = require('twilio')(accountSid, authToken);

module.exports = client;
