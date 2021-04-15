const express = require("express");

const router = express.Router();

const homePageController = require('../controllers/homepage.controller');

router.get('/home', homePageController.homepage);

module.exports = router;