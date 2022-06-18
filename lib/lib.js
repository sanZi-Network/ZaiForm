const { jwtEncode, jwtDecode, parserAuthorizationHeader } = require('./jwtWorker');
const { createAccount, loginAccount, verifyAccount, updateAccountProfile, readUserInfo, readAccountFile } = require('./accountWorker');
const { createForm, updateForm, updateFormField, deleteForm, readFormFields, readFormDB, readFormFile, getForms } = require('./formWorker');

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
    getForms
};