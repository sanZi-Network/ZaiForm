const { jwtEncode, jwtDecode, parserAuthorizationHeader } = require('./jwtWorker');
const { createAccount, loginAccount, verifyAccount, updateAccountProfile } = require('./accountWorker');
const { createForm, updateForm, updateFormField, deleteForm, readFormFields } = require('./formWorker');

module.exports = {
    jwtEncode,
    jwtDecode,
    createAccount,
    loginAccount,
    verifyAccount,
    updateAccountProfile,
    parserAuthorizationHeader,
    createForm,
    updateForm,
    updateFormField,
    deleteForm,
    readFormFields
};