function readAccountFile(userID) {
    const fs = require('fs');
    const FILE = `storaged/accounts/usr-${userID}.json`;

    if (!fs.existsSync(FILE)) return false;

    var userFile = fs.readFileSync(FILE);
    return JSON.parse(userFile);
}

function readUserInfo(userID) {
    const userFile = readAccountFile(userID);
    if (!userFile) return false;

    return {
        id: userFile.id,
        name: userFile.name
    };
}

function writeAccountFile(userID, userData) {
    const fs = require('fs');
    const FILE = `storaged/accounts/usr-${userID}.json`;

    fs.writeFileSync(FILE, JSON.stringify(userData));
    updateAccountDB(userID, userData.name, userData.email, userData.pass);

    return true;
}

function readAccountDB() {
    const fs = require('fs');

    if (!fs.existsSync(`storaged/accounts/accountDB.json`)) {
        fs.writeFileSync(`storaged/accounts/accountDB.json`, JSON.stringify([]));
    }

    const accountDB = JSON.parse(fs.readFileSync(`storaged/accounts/accountDB.json`));
    return accountDB;
}

function updateAccountDB(userID, userName, userEmail, userPass) {
    const fs = require('fs');
    const crypto = require('crypto');

    if (!userID || !userName || !userEmail || !userPass) return false;

    const userFile = readAccountFile(userID);
    if (!userFile) return false;

    const accountDB = readAccountDB();
    const accountIndex = accountDB.findIndex(account => account.id === userID);
    if (accountIndex === -1) {
        accountDB.push({
            id: userID,
            name: userName,
            email: userEmail,
            pass: userPass
        });

        fs.writeFileSync(`storaged/accounts/accountDB.json`, JSON.stringify(accountDB));
        return true;
    }

    accountDB[accountIndex].name = userName;
    accountDB[accountIndex].email = userEmail;
    accountDB[accountIndex].pass = userPass;
    accountDB[accountIndex].key = crypto.randomBytes(32).toString('hex');

    fs.writeFileSync(`storaged/accounts/accountDB.json`, JSON.stringify(accountDB));
    return true;
}

function updateAccountProfile(userID, userName, userEmail, userPass) {
    const crypto = require('crypto');

    if (!userID) return false;
    if (!userName && !userEmail && !userPass) return false;

    const userFile = readAccountFile(userID);
    if (!userFile) return false;

    userFile.name = userName || userFile.name;
    userFile.email = userEmail || userFile.email;
    if (userPass && userPass !== userFile.pass) {
        userFile.pass = crypto.createHash('sha256').update(userPass).digest('hex');
        userFile.key = crypto.randomBytes(32).toString('hex');
    }

    writeAccountFile(userID, userFile);
    return true;
}

function createAccount(userName, userPass, userEmail, userUID = null) {
    const { v4: uuidv4 } = require('uuid');
    const { jwtEncode, sendMail, replaceHTML, readTemplate } = require('./lib');
    const crypto = require('crypto');

    if (!userName || !userPass || !userEmail) return false;

    const accountDB = readAccountDB();
    if (accountDB.findIndex(account => account.name === userName || account.email === userEmail) !== -1) return false;

    function createID() {
        var id = uuidv4();
        if (readAccountFile(id) || accountDB.findIndex(account => account.id === id) !== -1) return createID();
        return id;
    }
    const userId = userUID || createID();

    const userKey = crypto.randomBytes(32).toString('hex');
    const userToken = jwtEncode({
        id: userId,
        key: crypto.createHash('sha512').update(userKey).digest('hex')
    });

    const pass = crypto.createHash('sha256').update(userPass).digest('hex');

    const userFile = {
        id: userId,
        name: userName,
        email: userEmail,
        pass: pass,
        key: userKey,
        enabled: true,
        mailVerified: {
            status: false,
            verifyKey: crypto.randomBytes(32).toString('hex')
        },
        createTimestamp: Date.now()
    };

    const mailVerify = Buffer.from(JSON.stringify({
        id: userId,
        token: userFile.mailVerified.verifyKey
    })).toString('base64');

    writeAccountFile(userId, userFile);
    var mail = readTemplate('verifyMail');
    mail = replaceHTML(mail, {
        username: userName,
        url: `${process.env.HOST}/api/sysAuth?authType=mailVerify&token=${mailVerify}`
    });
    sendMail(userEmail, '[ZaiForm] Verify your email', mail);

    return {
        id: userId,
        token: userToken
    };
}

function emailVerify(token) {
    if (!token) return false;

    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    const accountDB = readAccountDB();
    const accountIndex = accountDB.findIndex(account => account.id === tokenData.id);
    if (accountIndex === -1) return false;

    const account = readAccountFile(accountDB[accountIndex].id);
    if (account.mailVerified.status) return false;

    if (account.mailVerified.verifyKey !== tokenData.token) return false;

    account.mailVerified.status = true;
    account.mailVerified.verifyKey = null;
    writeAccountFile(account.id, account);

    return true;
}

function loginAccount(userName, userPass, isSocial = false) {
    const { jwtEncode } = require('./lib');
    const crypto = require('crypto');

    if (!userName || !userPass) return false;

    var pass;

    if (!isSocial) {
        pass = crypto.createHash('sha256').update(userPass).digest('hex');
    } else {
        pass = userPass;
    }

    const accountDB = readAccountDB();
    const accountIndex = accountDB.findIndex(account => account.name === userName && account.pass === pass || account.email === userName && account.pass === pass);
    if (accountIndex === -1) return false;

    const userFile = readAccountFile(accountDB[accountIndex].id);
    if (!userFile) return false;

    const userToken = jwtEncode({
        id: userFile.id,
        key: crypto.createHash('sha512').update(userFile.key).digest('hex')
    });

    return {
        id: userFile.id,
        token: userToken
    };
}

function verifyAccount(userToken) {
    const { jwtDecode } = require('./lib');
    const crypto = require('crypto');

    if (!userToken) return false;

    const userData = jwtDecode(userToken);
    if (!userData) return false;

    const userFile = readAccountFile(userData.id);
    if (!userFile) return false;

    if (crypto.createHash('sha512').update(userFile.key).digest('hex') !== userData.key) return false;

    return userFile;
}

module.exports = {
    createAccount,
    loginAccount,
    verifyAccount,
    updateAccountProfile,
    readUserInfo,
    readAccountFile,
    readAccountDB,
    emailVerify
}