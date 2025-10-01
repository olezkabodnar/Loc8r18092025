const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main'); 
/* GET home page. */
router.get('/', ctrlMain.index); 

/* GET login page. */
router.get('/login', ctrlMain.login);

router.get('/register', ctrlMain.register)

module.exports = router;

