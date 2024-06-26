const expressPromiseRouter = require('express-promise-router');
const router = expressPromiseRouter();
const flatter = require('../models/flatter');
const namelist = require('../models/namelist');
const family = require('../models/family');
const auth = require('../auth/auth');

router.get('/', function (req, res, next) {
    const data = namelist();
    data.history = req.session.history
    data.username = req.user
    res.render('list_view.html', data);
});

router.get('/sign-in', function (req, res, next) {
    res.render('sign_in.html');
});
router.post('/sign-in/enter', auth.sign_in({
    successRedirect: "/", failureRedirect: "/sign-in"
}));

router.post('/sign-out', auth.sign_out({
    successRedirect: "/"
}));

// LINEでログイン
router.get('/sign-in/line', auth.sign_in_line())

// LINEでログイン（コールバック）
router.get('/sign-in/line/cb', auth.sign_in_line_cb({
    successRedirect: "/", failureRedirect: "/sign-in"
}));


router.get('/family', async function (req, res, next) {
    const data = await family.list();
    res.render('family.html', { "family": data });
});

router.post('/add-family', async function (req, res, next) {
    const data = await family.add(req.body.name, req.body.age);
    res.render('family_result.html', { "message": data });
});

router.post('/remove-family', async function (req, res, next) {
    const data = await family.remove(req.body.name, req.body.age);
    res.render('family_result.html', { "message": data });
});


router.get('/flatter/:name', function (req, res, next) {
    const data = flatter(req.params.name);
    pushHistory(req.session, req.params.name);
    res.render('flatter_view.html', data);
});

router.get('/flatter-by-query', function (req, res, next) {
    const data = flatter(req.query.name);
    pushHistory(req.session, req.query.name);
    res.render('flatter_view.html', data);
});

router.post('/flatter-by-post', function (req, res, next) {
    const data = flatter(req.body.name);
    pushHistory(req.session, req.body.name);
    res.render('flatter_view.html', data);
});

router.get('/session-destroy', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

function pushHistory(session, name) {
    if (!session.history) {
        session.history = [];
    }
    session.history.push(name);
}

module.exports = router;
