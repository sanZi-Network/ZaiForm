const { jwtEncode, jwtDecode, parserAuthorizationHeader } = require('./jwtWorker');
const { createAccount, loginAccount, verifyAccount, updateAccountProfile } = require('./accountWorker');

module.exports = {
    jwtEncode,
    jwtDecode,
    createAccount,
    loginAccount,
    verifyAccount,
    updateAccountProfile,
    parserAuthorizationHeader
};