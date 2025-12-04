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
  openingHours: [String],
  reviewCount: {
    type: Number,
    default: 0
  },
  saved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Place', placeSchema);
