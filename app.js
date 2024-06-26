const express = require('express');
const mustacheExpress = require('mustache-express');
const logger = require('morgan');
const session = require('express-session')
const createError = require('http-errors');

const router = require('./controllers/router');
const auth = require('./auth/auth');

const app = express();

app.engine('html', mustacheExpress());

app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(session({
    secret: 'a random set of characters like 1aq2ws3de4',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.use(auth.session_authenticate);

app.use('/family', (req, res, next) => {
    if (req.user) {
        next();
    } else {
        next(createError(401, 'サインインしないと利用できません'));
    }
});


app.use('/', router);

app.listen(3000, () => { console.log("Listening on port 3000...") });
