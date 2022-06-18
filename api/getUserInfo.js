function getUserInfo(req, res) {
    const { verifyAccount, parserAuthorizationHeader, readAccountFile, getForms } = require('../lib/lib');
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

    const accountFile = readAccountFile(account.id);
    if (!accountFile) return res.status(400).json({
        error: 'Invalid account',
        status: 400
    });

    return res.status(200).json({
        message: 'User info',
        status: 200,
        data: {
            id: account.id,
            name: accountFile.name,
            email: accountFile.email,
            forms: getForms(account.id)
        }
    });
}

module.exports.getUserInfo = getUserInfo;