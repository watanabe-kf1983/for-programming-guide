const expressPromiseRouter = require('express-promise-router');
const router = expressPromiseRouter();
const flatter = require('../models/flatter');
const namelist = require('../models/namelist');
const family = require('../models/family');
const auth = require('../auth/auth');

router.get('/', async function (req, res, next) {
    const user = req.user;
    const flatterees = await flatter.getFlatterees(user);
    const flatterers = await flatter.getFlatterers(user);
    const data = {
        username: user,
        namelist: namelist().namelist,
        history: {
            flatterees: flatterees,
            flatterers: flatterers
        },
    };
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


router.get('/flatter/:name', async function (req, res, next) {
    const data = await flatter.flatter(req.params.name, req.user);
    res.render('flatter_view.html', data);
});

router.get('/flatter-by-query', async function (req, res, next) {
    const data = await flatter.flatter(req.query.name, req.user);
    res.render('flatter_view.html', data);
});

router.post('/flatter-by-post', async function (req, res, next) {
    const data = await flatter.flatter(req.body.name, req.user);
    res.render('flatter_view.html', data);
});


module.exports = router;
