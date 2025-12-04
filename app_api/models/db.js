const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

try {
  mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(
    () => { console.log("Mongoose is connected"); },
    err => { console.log("Mongoose connection error:", err); }
  );
} catch (e) {
  console.log("could not connect");
}

// Load models after connecting
require('./locations');
require('./users');
