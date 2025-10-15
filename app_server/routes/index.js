const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');


router.get('/', ctrlLocations.homelist);


/* Other pages */
router.get('/login', ctrlMain.login);
router.get('/register', ctrlMain.register);

module.exports = router;

