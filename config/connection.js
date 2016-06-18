var Promise = require('bluebird')
var mongoose = Promise.promisifyAll(require('mongoose'));


mongoose.connect('mongodb://localhost/finalProjTest' || 'mongodb://heroku_3rtj0nf1:cqiksmdodkhfujudh7oks0nhjp@ds011321.mlab.com:11321/heroku_3rtj0nf1');
var db = mongoose.connection;

module.exports = db;
