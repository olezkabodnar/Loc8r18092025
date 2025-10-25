
const mongoose = require('mongoose');

const dbURI = "mongodb+srv://olezkabodnar_db_user:Admin@cluster1.086xgm2.mongodb.net/?appName=Cluster1/Loc8r?retryWrites=true&w=majority";


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

require('./locations');
