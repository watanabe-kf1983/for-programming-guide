const passport = require("passport");
const LocalStrategy = require("passport-local");


const strategy = new LocalStrategy(async (username, password, cb) => {
    if (password === "NG") {
        return cb(null, false);
    } else {
        return cb(null, username);
    }
});
passport.use("local", strategy);

passport.serializeUser(async (user, cb) => {
    return cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
    return cb(null, user);
});

function sign_in({ successRedirect, failureRedirect }) {
    return passport.authenticate("local", {
        successRedirect: successRedirect,
        failureRedirect: failureRedirect,
    });
}

function sign_out({ successRedirect }) {
    return function (req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect(successRedirect);
        });
    };
}

const session_authenticate = passport.authenticate("session");

module.exports = {
    sign_in: sign_in,
    sign_out: sign_out,
    session_authenticate: session_authenticate,
};