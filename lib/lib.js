const { jwtEncode, jwtDecode, parserAuthorizationHeader } = require('./jwtWorker');
const { createAccount, loginAccount, verifyAccount, updateAccountProfile, readUserInfo, readAccountFile, readAccountDB, emailVerify } = require('./accountWorker');
const { createForm, updateForm, updateFormField, deleteForm, readFormFields, readFormDB, readFormFile, getForms } = require('./formWorker');
const { createSanZiAuthToken, getSanZiUserInfo, checkSanZiAvailable } = require('./sanZiAuthWorker');
const { sendMail, isSmtpUsable } = require('./smtpWorker');
const { replaceHTML, readTemplate } = require('./templateWorker');

module.exports = {
    jwtEncode,
    jwtDecode,
    createAccount,
    loginAccount,
    verifyAccount,
    updateAccountProfile,
    emailVerify,
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
    isSmtpUsable,
    replaceHTML,
    readTemplate
};