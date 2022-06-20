function viewForm(req, res) {
    const { readFormDB, verifyAccount, parserAuthorizationHeader, readFormFile, readUserInfo } = require('../lib/lib');
    const fromID = req.params.form;
    var userID;
    if (!fromID) return res.status(400).json({
        message: 'Missing form ID',
        status: 400
    });

    if (req.headers.authorization) {
        const auth = parserAuthorizationHeader(req.headers.authorization);
        if (!auth) return res.status(401).json({
            message: 'Invalid authorization header',
            status: 401
        });

        const account = verifyAccount(auth);
        if (!account) return res.status(401).json({
            message: 'Invalid authorization header',
            status: 401
        });

        userID = account.id;
    }

    const formDB = readFormDB();
    const formDBData = formDB.find(form => form.id === fromID);
    const formData = readFormFile(fromID, formDBData.author);
    if (!formDBData) return res.status(404).json({
        message: 'Form not found',
        status: 404
    });

    if (formDBData.author !== userID) {
        formData.fields.map(option => {
            option.answers = null;
        });
        formData.userChoice = null;
    }
    formData.author = readUserInfo(formDBData.author);

    return res.status(200).json({
        message: 'Form found',
        status: 200,
        data: formData
    });
}

module.exports.viewForm = viewForm;