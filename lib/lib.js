const { jwtEncode, jwtDecode, parserAuthorizationHeader } = require('./jwtWorker');
const { createAccount, loginAccount, verifyAccount, updateAccountProfile, readUserInfo, readAccountFile, readAccountDB } = require('./accountWorker');
const { createForm, updateForm, updateFormField, deleteForm, readFormFields, readFormDB, readFormFile, getForms } = require('./formWorker');
const { createSanZiAuthToken, getSanZiUserInfo, checkSanZiAvailable } = require('./sanZiAuthWorker');
const { sendMail, isSmtpUsable } = require('./smtpWorker');

module.exports = {
    jwtEncode,
    jwtDecode,
    createAccount,
    loginAccount,
    verifyAccount,
    updateAccountProfile,
    readUserInfo,
    parserAuthorizationHeader,
    createForm,
    updateForm,
    updateFormField,
    deleteForm,
    readFormFields,
    readFormDB,
    readFormFile,
    readAccountFile,
    getForms,
    createSanZiAuthToken,
    getSanZiUserInfo,
    checkSanZiAvailable,
    readAccountDB,
    sendMail,
    isSmtpUsable
};