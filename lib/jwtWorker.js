function parserAuthorizationHeader(authorization) {
    if (!authorization) return null;
    const parts = authorization.split(' ');
    if (parts.length !== 2) return null;
    const scheme = parts[0];
    const credentials = parts[1];
    if (!/^Bearer$/i.test(scheme)) return null;
    return credentials;
}

function jwtEncode(payload, expTime = "3h", keyPath = "storaged/authPrivate.key") {
    const jwt = require('jsonwebtoken');
    const fs = require('fs');
    var privateKey = fs.readFileSync('storaged/authPrivate.key');
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: expTime
    });
}

function jwtDecode(token, keyPath = "storaged/authPublic.pem") {
    const jwt = require('jsonwebtoken');
    const fs = require('fs');

    if (!fs.existsSync(keyPath)) return null;

    const key = fs.readFileSync(keyPath);
    try {
        return jwt.verify(token, key, { algorithms: ['RS256'] });
    } catch (e) {
        return false;
    }
}

module.exports = { jwtEncode, jwtDecode, parserAuthorizationHeader };