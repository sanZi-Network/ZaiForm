const _Mailer = {};

function isSmtpUsable() {
    var available = ["gmail", "smtp"];
    if (!process.env.SMTP_TYPE) return false;
    if (available.indexOf(process.env.SMTP_TYPE) === -1) return false;
    if (process.env.SMTP_TYPE === "gmail") {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return false;
    }
    if (process.env.SMTP_TYPE === "smtp") {
        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_SECURE) return false;
    }
    if (!process.env.SMTP_FROM) return false;

    return true;
}

function initMailer() {
    if (!isSmtpUsable()) return false;
    if (_Mailer.initialized) return true;

    var nodemailer = require('nodemailer');

    if (process.env.SMTP_TYPE === "gmail") {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    } else if (process.env.SMTP_TYPE === "smtp") {
        var transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: Boolean(process.env.SMTP_SECURE),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    _Mailer.transporter = transporter;
    _Mailer.initialized = true;

    return true;
}

function sendMail(sendTo, subject = "ZaiForm Infomation", content = "<h1>Hello World</h1>") {
    return new Promise((resolve, reject) => {
        if (!initMailer()) return reject("Mailer not initialized");
        if (!sendTo || !subject || !content) return reject("Invalid parameters");

        const { transporter } = _Mailer;

        var mailOptions = {
            from: process.env.SMTP_FROM,
            to: sendTo,
            subject: subject,
            html: content,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return reject(error);
            } else {
                return resolve(info);
            }
        });
    });
}

module.exports = {
    sendMail,
    isSmtpUsable
}