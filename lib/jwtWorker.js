function jwtEncode(token, expTime = "3h", keyPath = "storaged/authPrivate.key") {
    const jwt = require('jsonwebtoken');
    const fs = require('fs');
    var privateKey = fs.readFileSync('storaged/authPrivate.key');
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: expTime
    });
}

function jwtDecode(token, keyPath = "storaged/authPublic.key") {
    const jwt = require('jsonwebtoken');
    const fs = require('fs');

    if (!fs.existsSync(keyPath)) return null;

    const key = fs.readFileSync(keyPath);
    try {
        return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (e) {
        return false;
    }
}

module.exports = { jwtEncode, jwtDecode };