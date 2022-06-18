function readAccountFile(userID) {
    const fs = require('fs');
    const FILE = `storaged/accounts/usr-${userID}.json`;

    if (!fs.existsSync(FILE)) return false;

    var userFile = fs.readFileSync(FILE);
    return JSON.parse(userFile);
}

function writeAccountFile(userID, userData) {
    const fs = require('fs');
    const FILE = `storaged/accounts/usr-${userID}.json`;

    fs.writeFileSync(FILE, JSON.stringify(userData));
}

function createAccount(userName, userPass, userEmail) {
    const { v4: uuidv4 } = require('uuid');
    const { jwtEncode } = require('./lib');
    const crypto = require('crypto');

    if (!userName || !userPass || !userEmail) return false;

    function createID() {
        var id = uuidv4();
        if (readAccountFile(userId)) return createID();
        return id;
    }
    const userId = createID();

    const userKey = crypto.randomBytes(32).toString('hex');
    const userToken = jwtEncode({
        id: userId,
        key: userKey
    });

    const pass = crypto.createHash('sha256').update(userPass).digest('hex');

    const userFile = {
        id: userId,
        name: userName,
        email: userEmail,
        pass: pass,
        key: userKey
    };

    writeAccountFile(userId, userFile);

    return {
        id: userId,
        token: userToken
    };
}

function loginAccount(userName, userPass) {
    const { jwtEncode } = require('./lib');
    const crypto = require('crypto');

    if (!userName || !userPass) return false;

    const userFile = readAccountFile(userName);
    if (!userFile) return false;

    const pass = crypto.createHash('sha256').update(userPass).digest('hex');
    if (userFile.pass !== pass) return false;

    const userToken = jwtEncode({
        id: userFile.id,
        key: userFile.key
    });

    return {
        id: userFile.id,
        token: userToken
    };
}

function verifyAccount(userToken) {
    const { jwtDecode } = require('./lib');

    if (!userToken) return false;

    const userData = jwtDecode(userToken);
    if (!userData) return false;

    const userFile = readAccountFile(userData.id);
    if (!userFile) return false;

    return userFile;
}

module.exports = {
    createAccount,
    loginAccount,
    verifyAccount
}