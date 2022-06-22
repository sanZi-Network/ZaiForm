function editForm(req, res) {
    const { verifyAccount, parserAuthorizationHeader, updateForm, updateFormField, deleteForm } = require('../lib/lib');
    // check auth
    if (!req.headers.authorization) return res.status(401).json({
        message: 'Missing authorization header',
        status: 401
    });

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

    // check method
    if (req.method === "DELETE") {
        const { id } = req.body;
        if (!id) return res.status(400).json({
            message: 'Missing id',
            status: 400
        });

        var ret = deleteForm(id, account.id);
        if (ret === false) return res.status(400).json({
            message: 'Invalid id',
            status: 400
        });

        return res.status(204).end();
    }

    // check body
    const { id, title, fields } = req.body;
    if (!id) return res.status(400).json({
        message: 'Missing id',
        status: 400
    });

    if (!title || !fields) return res.status(400).json({
        message: 'Missing title or fields',
        status: 400
    });

    if (title) {
        updateForm(id, account.id, title);
    }

    if (fields) {
        fields.sort((a, b) => a.index - b.index);
        for (let i = 0; i < fields.length; i++) {
            const { title: fieldTitle, type: fieldType, options: fieldOptions, index: fieldIndex } = fields[i];
            if (!fieldTitle || !fieldType || !fieldIndex) continue;

            updateFormField(id, fieldId, i, {
                title: fieldTitle,
                type: fieldType,
                options: fieldOptions
            });
        }
    }

    return res.status(204).end();
}

module.exports.editForm = editForm;