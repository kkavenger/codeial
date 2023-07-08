const mongoose = require('mongoose');
const env = require('./enviroment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.log.bind(console, "Error in MongoDB connection"));

db.once('open', function(){
    console.log('Connected to MongoDB');
});

module.exports = db;