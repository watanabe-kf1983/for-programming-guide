const express = require('express');
const router = express.Router();
const flatter = require('../models/flatter');
const namelist = require('../models/namelist');
const richardlist = require('../models/richard');

router.get('/', function (req, res, next) {
    const data = namelist();
    console.log(data);
    res.render('list_view.html', data);
});

router.get('/richard', function (req, res, next) {
    const data = richardlist();
    console.log(data);
    res.render('list_view.html', data);
});

router.get('/flatter/:name', function (req, res, next) {
    const data = flatter(req.params.name);
    console.log(data);
    res.render('flatter_view.html', data);
});

module.exports = router;
