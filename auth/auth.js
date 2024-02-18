const passport = require("passport");
const LocalStrategy = require("passport-local");
const OpenIDConnectStrategy = require('passport-openidconnect');

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

const url = process.env.RENDER_EXTERNAL_URL || "http://localhost:3000";

const linestrategy = new OpenIDConnectStrategy({
    issuer: 'https://access.line.me',
    authorizationURL: 'https://access.line.me/oauth2/v2.1/authorize',
    tokenURL: 'https://api.line.me/oauth2/v2.1/token',
    userInfoURL: 'https://api.line.me/oauth2/v2.1/profile',
    clientID: process.env.LINE_CHANNEL_ID,
    clientSecret: process.env.LINE_CHANNEL_SECRET,
    callbackURL: `${url}/sign-in/line/cb`,
    scope: ["profile", "openid"],
},
    function verify(issuer, profile, cb) {
        return cb(null, profile.displayName);
    }
);

passport.use("line", linestrategy);

function sign_in_line() {
    return passport.authenticate("line");
}

function sign_in_line_cb({ successRedirect, failureRedirect }) {
    return passport.authenticate("line", {
        successRedirect: successRedirect,
        failureRedirect: failureRedirect,
    });
}

const session_authenticate = passport.authenticate("session");

module.exports = {
    sign_in: sign_in,
    sign_out: sign_out,
    sign_in_line: sign_in_line,
    sign_in_line_cb: sign_in_line_cb,
    session_authenticate: session_authenticate,
};