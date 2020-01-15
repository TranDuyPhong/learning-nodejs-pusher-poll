const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect('dbpath')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));