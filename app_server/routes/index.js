const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');


router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);


/* Other pages */
router.get('/login', ctrlMain.login);
router.get('/register', ctrlMain.register);

module.exports = router;

