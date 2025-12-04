const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Protected routes - require login
router.get('/', isAuthenticated, ctrlLocations.homelist);
router.get('/search', isAuthenticated, ctrlLocations.searchResults);
router.get('/location', isAuthenticated, ctrlLocations.locationInfo);


/* Authentication pages */
router.get('/login', ctrlMain.login);
router.post('/login', ctrlMain.doLogin);
router.get('/register', ctrlMain.register);
router.post('/register', ctrlMain.doRegister);
router.get('/logout', ctrlMain.logout);

module.exports = router;

