const createError = require('http-errors');
const family = require('../models/family');

const authorizeFamilyMember = async (req, res, next) => {
    try {
        console.log(req.user);
        const isMember = await family.isMember(req.user);
        if (isMember) {
            next();
        } else {
            next(createError(403,
                '家族のみが、利用できます。あなたは利用できません'));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authorizeFamilyMember: authorizeFamilyMember,
};