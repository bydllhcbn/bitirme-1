var express = require('express');
var router = express.Router();
let db = require('../db');

router.get('/', async (req, res) => {
  res.render('client', {title: 'CLIENT',layout: false});
});

module.exports = router;
