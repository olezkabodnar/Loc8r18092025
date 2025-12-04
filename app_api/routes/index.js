const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlAuth = require('../controllers/auth');

// locations
router
  .route('/locations')
  .get(ctrlLocations.locationsListByDistance)
  .post(ctrlLocations.locationsCreate);

router
  .route('/locations/search')
  .get(ctrlLocations.locationsSearch);

router
  .route('/locations/:locationid')
  .get(ctrlLocations.locationsReadOne)
  .put(ctrlLocations.locationsToggleSave)
  .delete(ctrlLocations.locationsDeleteOne);

// auth
router
  .route('/register')
  .post(ctrlAuth.authRegister);

router
  .route('/login')
  .post(ctrlAuth.authLogin);

module.exports = router;
