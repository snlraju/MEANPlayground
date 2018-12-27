var mongoose = require('mongoose');

var imdbSchema = new mongoose.Schema({
	name: String,
});

module.exports = mongoose.model('imdb', imdbSchema)