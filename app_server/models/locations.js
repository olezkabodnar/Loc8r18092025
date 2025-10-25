const mongoose = require('mongoose');

// Main Place Schema
const placeSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true
  },
  placeType: {
    type: String,
    default: 'Other'
  },
  fullAddress: String,
  contactPhone: String,
  webUrl: String,
  photoUrl: String,
  overallScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  features: [String],
  geoLocation: {
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    }
  },
  openingHours: [String],
  reviewCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Place', placeSchema);
