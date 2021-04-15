const fs = require('fs');
const express = require("express");

const router = express.Router();

const playerController = require('../controllers/players.controller')

router.get('/add', playerController.addPlayerPage);
router.get('/edit/:id', playerController.editPlayerPage);
router.get('/delete/:id', playerController.deletePlayer);
router.post('/edit/:id', playerController.editPlayer);


router.post('/add', playerController.addPlayer);


module.exports = router;
