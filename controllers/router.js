const express = require('express');
const router = express.Router();
const flatter = require('../models/flatter');
const namelist = require('../models/namelist');

router.get('/', function (req, res, next) {
    const data = namelist();
    console.log(data);
    res.render('list_view.html', data);
});

router.get('/flatter/:name', function (req, res, next) {
    const data = flatter(req.params.name);
    console.log(data);
    res.render('flatter_view.html', data);
});

router.get('/flatter-by-query', function (req, res, next) {
    const data = flatter(req.query.name);
    res.render('flatter_view.html', data);
});

router.post('/flatter-by-post', function (req, res, next) {
    const data = flatter(req.body.name);
    res.render('flatter_view.html', data);
});

module.exports = router;
