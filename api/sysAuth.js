async function sysAuth(req, res) {
    const { action } = req.body;
    const crypto = require('crypto');
    const requestIp = require('request-ip');
    const { createAccount, loginAccount, readAccountFile, createSanZiAuthToken, getSanZiUserInfo, checkSanZiAvailable, readAccountDB, readTemplate, replaceHTML, sendMail, updateAccountProfile, jwtEncode, jwtDecode, emailVerify } = require('../lib/lib');

    function validateEmail(email) {
        // https://stackoverflow.com/a/46181
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (req.query.authType === "sanZi") {
        if (!checkSanZiAvailable()) return res.status(400).json({
            message: 'SanZi Auth is not available',
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
            message: 'Invalid SanZi Auth token',
            status: 400
        });

        const {
            UserName,
            UserUID,
            UserEmail
        } = sanZiUserInfo.data.userData;
        const accountDB = readAccountDB();
        var account = accountDB.find(account => account.id === `SanZi-${UserUID}`);
        if (!account) {
            account = createAccount(UserName, crypto.randomBytes(16).toString('hex'), UserEmail, `SanZi-${UserUID}`);
        } else {
            account = loginAccount(UserName, account.pass, "social");
        }

        if (!account) return res.status(400).json({
            message: 'The account has been created, you need to login with your account',
            status: 400
        });

        // Return a html page with the token
        return res.status(200).set('Content-Type', 'text/html').send(Buffer.from(`<html><body><script>localStorage.setItem("auth", "${account.token}");self.close();</script></body></html>`));
    }

    if (req.query.authType === "mailVerify") {
        const { token } = req.query;
        if (!token) return res.status(400).json({
            message: 'Invalid token',
            status: 400
        });

        const verify = emailVerify(token);

        if (!verify) return res.status(400).json({
            message: 'Invalid token',
            status: 400
        });

        // Redirect to login page
        return res.status(302).redirect(`${process.env.HOST}/login`);
    }

    if (action === "register") {
        const { username, password, email } = req.body;

        if (!username || !password || !email) return res.status(400).json({
            message: 'Missing username, password or email',
            status: 400
        });

        if (!validateEmail(email)) return res.status(400).json({
            message: 'Invalid email',
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
            message: 'Missing username or password',
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
            message: 'SanZi Auth is not available',
            status: 400
        });

        // Get client IP
        const ip = requestIp.getClientIp(req).split(':').pop();
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

    if (action === "resetPassword") {
        const accountDB = readAccountDB();
        const { email } = req.body;

        if (!email) return res.status(400).json({
            message: 'Missing email',
            status: 400
        });

        if (!validateEmail(email)) return res.status(400).json({
            message: 'Invalid email',
            status: 400
        });

        const account = accountDB.find(account => account.email === email);
        if (!account) return res.status(400).json({
            message: "The account does not exist",
            status: 400
        });

        const accountData = readAccountFile(account.id);
        const key = crypto.createHash('sha256').update(accountData.key).digest('hex');

        const token = Buffer.from(jwtEncode({
            id: account.id,
            key: key
        }, "1h")).toString('base64');

        const template = readTemplate("resetPassword");
        const html = replaceHTML(template, {
            url: `${process.env.HOST}/resetPassword?token=${token}`
        });

        sendMail(email, "[ZaiForm] Reset Password", html);

        return res.status(200).json({
            message: "The reset password email has been sent",
            status: 200
        });
    }

    if (action === "newPassword") {
        const { token, password } = req.body;

        if (!token || !password) return res.status(400).json({
            message: 'Missing token or password',
            status: 400
        });

        const accountData = Buffer.from(token, 'base64').toString('utf8');
        var account;
        try {
            account = jwtDecode(accountData);
        } catch (error) {
            return res.status(400).json({
                message: "Invalid token",
                status: 400
            });
        }

        if (!account) return res.status(400).json({
            message: "Invalid token",
            status: 400
        });

        const accountFile = readAccountFile(account.id);
        if (!accountFile) return res.status(400).json({
            message: "Invalid token",
            status: 400
        });

        const key = crypto.createHash('sha256').update(accountFile.key).digest('hex');
        if (key !== account.key) return res.status(400).json({
            message: "Invalid token",
            status: 400
        });

        var t = updateAccountProfile(account.id, null, null, password);
        if (!t) return res.status(500).json({
            message: "Internal server error",
            status: 500
        });

        return res.status(204)
    }

    return res.status(400).json({
        message: 'Invalid action',
        status: 400
    });
}

module.exports.sysAuth = sysAuth;