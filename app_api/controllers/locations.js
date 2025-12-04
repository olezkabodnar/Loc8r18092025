const mongoose = require('mongoose');

const locationsSearch = function(req, res) {
  const location = req.query.location || '';
  const type = req.query.type || '';
  const Place = mongoose.model('Place');

  let query = {};

  if (location) {
    query.$or = [
      { placeName: { $regex: location, $options: 'i' } },
      { fullAddress: { $regex: location, $options: 'i' } }
    ];
  }

  if (type) {
    query.placeType = { $regex: type, $options: 'i' };
  }

  Place.find(query)
    .then(places => {
      res.status(200).json(places);
    })
    .catch(err => {
      res.status(500).json({ message: "Error searching locations", error: err });
    });
};

const locationsCreate = function(req, res) {
  const Place = mongoose.model('Place');
  Place.create({
    placeName: req.body.placeName,
    fullAddress: req.body.fullAddress,
    features: req.body.features ? req.body.features.split(",") : [],
    placeType: req.body.placeType,
    contactPhone: req.body.contactPhone,
    webUrl: req.body.webUrl,
    photoUrl: req.body.photoUrl,
    overallScore: req.body.overallScore ? parseInt(req.body.overallScore) : 0,
    openingHours: req.body.openingHours ? (Array.isArray(req.body.openingHours) ? req.body.openingHours : [req.body.openingHours]) : [],
    reviewCount: req.body.reviewCount ? parseInt(req.body.reviewCount) : 0
  })
  .then(location => {
    res
      .status(201)
      .json(location);
  })
  .catch(err => {
    res
      .status(400)
      .json({ message: "Error creating location", error: err });
  });
};

const locationsListByDistance = function (req, res) {
  const Place = mongoose.model('Place');

  Place.find({ saved: true })
    .then(places => {
      res
        .status(200)
        .json(places);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error retrieving locations", error: err });
    });
};

const locationsReadOne = function (req, res) {
  if (req.params && req.params.locationid) {
    const Place = mongoose.model('Place');
    Place
      .findById(req.params.locationid)
      .then(location => {
        if (!location) {
          return res
            .status(404)
            .json({ message: "locationid not found" });
        }
        res
          .status(200)
          .json(location);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error retrieving location", error: err });
      });
  } else {
    res
      .status(400)
      .json({ message: "No locationid in request" });
  }
};

const locationsDeleteOne = function (req, res) {
  if (!req.params || !req.params.locationid) {
    return res
      .status(400)
      .json({ message: "Missing locationid" });
  }

  const Place = mongoose.model('Place');

  Place.findById(req.params.locationid)
    .then(place => {
      if (!place) {
        return res
          .status(404)
          .json({ message: "Place not found" });
      }

      place.saved = false;

      return place.save().then(updatedPlace => {
        res
          .status(200)
          .json({ message: "Place removed from saved", place: updatedPlace });
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error removing place", error: err });
    });
};

const locationsToggleSave = function (req, res) {
  if (!req.params || !req.params.locationid) {
    return res
      .status(400)
      .json({ message: "Missing locationid" });
  }

  const Place = mongoose.model('Place');

  Place.findById(req.params.locationid)
    .then(place => {
      if (!place) {
        return res
          .status(404)
          .json({ message: "Place not found" });
      }

      // Toggle the saved status
      place.saved = !place.saved;

      return place.save().then(updatedPlace => {
        res
          .status(200)
          .json({ message: `Place ${updatedPlace.saved ? 'saved' : 'removed'} successfully`, place: updatedPlace });
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error toggling place save status", error: err });
    });
};

module.exports = {
  locationsSearch,
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsDeleteOne,
  locationsToggleSave
};
