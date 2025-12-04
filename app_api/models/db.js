const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri);
// Load models first before connecting
require('./locations');
require('./users');

try {
  mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(
    () => { console.log("Mongoose is connected"); },
    err => { console.log("Mongoose connection error:", err); }
  );
} catch (e) {
  console.log("could not connect");
}
