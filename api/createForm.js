function createForm(req, res) {
    const { verifyAccount, parserAuthorizationHeader, createForm } = require('../lib/lib');
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

    // check body
    const { action, title } = req.body;
    if (!title) return res.status(400).json({
        error: 'Missing title',
        status: 400
    });

    switch (action) {
        case "regular":
            const form = createForm(title, "regular", account.id);
            if (!form) return res.status(400).json({
                message: "The form already exists",
                status: 400
            });

            return res.status(201).json({
                message: "The form has been created",
                status: 201,
                data: {
                    id: form
                }
            });
        
        case "score":
            const scoreForm = createForm(title, "score", account.id);
            if (!scoreForm) return res.status(400).json({
                message: "The form already exists",
                status: 400
            });

            return res.status(201).json({
                message: "The form has been created",
                status: 201,
                data: {
                    id: scoreForm
                }
            });
    }

    return res.status(400).json({
        error: 'Invalid action',
        status: 400
    });
}

module.exports.createForm = createForm;