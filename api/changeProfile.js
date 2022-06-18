function changeProfile(req, res) {
    const { verifyAccount, parserAuthorizationHeader, updateAccountProfile } = require('../lib/lib');
    // check auth
    if (!req.headers.authorization) return res.status(401).json({
        error: 'Missing authorization header',
        status: 401
    });

    const auth = parserAuthorizationHeader(req.headers.authorization);
    if (!auth) return res.status(401).json({
        error: 'Invalid authorization header',
        status: 401
    });

    const account = verifyAccount(auth);
    if (!account) return res.status(401).json({
        error: 'Invalid authorization header',
        status: 401
    });

    var { name, email, pass } = account;

    // check body
    var { name: reqName, email: reqEmail, password: reqPass } = req.body;
    name = reqName || name;
    email = reqEmail || email;
    pass = reqPass || pass;

    updateAccountProfile(account.id, name, email, pass);

    return res.status(204).end();
}

module.exports.changeProfile = changeProfile;