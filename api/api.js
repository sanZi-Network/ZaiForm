const { sysAuth } = require('./sysAuth');
const { changeProfile } = require('./changeProfile');
const { createForm } = require('./createForm');
const { editForm } = require('./editForm');
const { viewForm } = require('./viewForm');
const { getUserInfo } = require('./getUserInfo');

module.exports = {
    sysAuth,
    changeProfile,
    createForm,
    editForm,
    viewForm,
    getUserInfo
}