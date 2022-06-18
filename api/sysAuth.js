function sysAuth(req, res) {
    const { action } = req.body;
    const { createAccount, loginAccount } = require('../lib/lib');

    function validateEmail(email) {
        // https://stackoverflow.com/a/46181
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

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

    return res.status(400).json({
        error: 'Invalid action',
        status: 400
    });
}

module.exports.sysAuth = sysAuth;