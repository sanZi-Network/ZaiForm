function readTemplate(type) {
    if (!type) return null;

    const availableTemplates = {
        resetPassword: 'resetPassword.mail.html',
        verifyMail: 'verifyMail.mail.html',
        newRequest: 'newRequest.mail.html',
    }
    if (!availableTemplates[type]) return null;

    const fs = require('fs');
    const path = require('path');
    const file = path.join(__dirname, '../template/' + availableTemplates[type]);

    return fs.readFileSync(file, 'utf8');
}

function replaceHTML(html, data) {
    if (!html || !data) return null;

    const handlebars = require('handlebars');
    const template = handlebars.compile(html);
    return template(data);
}

module.exports = {
    replaceHTML,
    readTemplate
}