const express = require('express');
const router = express.Router();
const { Homepage, studentsingup, studentsingin,studentsingout } = require("../controller/indexController")

router.get('/', Homepage )


router.post('/student/signup', studentsingup)


//signingup routes
router.post('/student/signin', studentsingin)


//signout routes
router.get('/student/signout', studentsingout)


module.exports = router;