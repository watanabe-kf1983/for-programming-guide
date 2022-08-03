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

module.exports = router;