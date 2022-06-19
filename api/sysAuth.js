async function sysAuth(req, res) {
    const { action } = req.body;
    const crypto = require('crypto');
    const requestIp = require('request-ip');
    const { createAccount, loginAccount, createSanZiAuthToken, getSanZiUserInfo, checkSanZiAvailable, readAccountDB } = require('../lib/lib');

    function validateEmail(email) {
        // https://stackoverflow.com/a/46181
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (req.query.authType === "sanZi") {
        if (!checkSanZiAvailable()) return res.status(400).json({
            error: 'SanZi Auth is not available',
            status: 400
        });

        const { key } = req.query;
        var sanZiUserInfo;

        try {
            sanZiUserInfo = await getSanZiUserInfo(key);
        } catch (error) {
            return res.status(400).json({
                message: "Invalid SanZi Auth token or server might not available for SanZi Auth",
                status: 400
            });
        }

        if (!sanZiUserInfo) return res.status(400).json({
            error: 'Invalid SanZi Auth token',
            status: 400
        });

        const {
            UserName,
            UserUID,
            UserEmail
        } = sanZiUserInfo.data.userData;
        const accountDB = readAccountDB();
        var account = accountDB.find(account => account.sanZiID === `SanZi-${UserUID}`);
        if (!account) {
            account = createAccount(UserName, crypto.randomBytes(16).toString('hex'), UserEmail, `SanZi-${UserUID}`);
        } else {
            account = loginAccount(UserName, crypto.randomBytes(16).toString('hex'), "social");
        }

        if (!account) return res.status(400).json({
            error: 'The account has been created, you need to login with your account',
            status: 400
        });

        // Return a html page with the token
        return res.status(200).set('Content-Type', 'text/html').send(Buffer.from(`<html><body><script>localStorage.setItem("auth", "${account.token}");self.close();</script></body></html>`));
    }

    if (action === "register") {
        const { username, password, email } = req.body;

        if (!username || !password || !email) return res.status(400).json({
            error: 'Missing username, password or email',
            status: 400
        });

        if (!validateEmail(email)) return res.status(400).json({
            error: 'Invalid email',
            status: 400
        });

        const account = createAccount(username, password, email);
        if (!account) return res.status(400).json({
            message: "The account already exists",
            status: 400
        });

        return res.status(201).json({
            message: "The account has been created",
            status: 201,
            data: {
                id: account.id,
                token: account.token
            }
        });
    }
    
    if (action === "login") {
        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({
            error: 'Missing username or password',
            status: 400
        });

        const account = loginAccount(username, password);
        if (!account) return res.status(400).json({
            message: "The account does not exist or the password is incorrect",
            status: 400
        });

        return res.status(200).json({
            message: "The account has been logged in",
            status: 200,
            data: {
                id: account.id,
                token: account.token
            }
        });
    }

    if (action === "sanZiLogin") {
        if (!checkSanZiAvailable()) return res.status(400).json({
            error: 'SanZi Auth is not available',
            status: 400
        });

        // Get client IP
        const ip = requestIp.getClientIp(req);
        var auth;
        
        try {
            auth = await createSanZiAuthToken(ip);
        } catch (error) {
            return res.status(400).json({
                message: "This server might not available for SanZi Auth",
                status: 400
            });
        }

        return res.status(200).json({
            message: "Successfully created SanZi Auth token",
            status: 200,
            data: {
                authID: auth.authTkn,
                authURI: auth.authURI
            }
        });
    }

    return res.status(400).json({
        error: 'Invalid action',
        status: 400
    });
}

module.exports.sysAuth = sysAuth;