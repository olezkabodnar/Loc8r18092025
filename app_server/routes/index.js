const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');


router.get('/', ctrlLocations.homelist);
router.get('/search', ctrlLocations.searchResults);
router.get('/location', ctrlLocations.locationInfo);


/* Other pages */
router.get('/login', ctrlMain.login);
router.post('/login', ctrlMain.doLogin);
router.get('/register', ctrlMain.register);
router.post('/register', ctrlMain.doRegister);

module.exports = router;

