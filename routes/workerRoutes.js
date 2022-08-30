const express = require('express');
const mongoose = require('mongoose');
const workerModel = require('../models/workerModel')

const router = express.Router();


router.get('/', function(req, res) {
    res.render('index');
  });
  

module.exports = router;
