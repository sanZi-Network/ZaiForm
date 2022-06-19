function readFormFile(formID, userID) {
    const fs = require('fs');
    const FILE = `storaged/forms/${userID}/${formID}.json`;

    if (!fs.existsSync(FILE)) return false;

    var userFile = fs.readFileSync(FILE);
    return JSON.parse(userFile);
}

function readFormDB() {
    const fs = require('fs');

    if (!fs.existsSync(`storaged/forms/formDB.json`)) {
        fs.writeFileSync(`storaged/forms/formDB.json`, JSON.stringify([]));
    }

    const formDB = JSON.parse(fs.readFileSync(`storaged/forms/formDB.json`));
    return formDB;
}

function writeFormFile(formID, userID, formData) {
    const fs = require('fs');

    if (!formID || !userID || !formData) return false;

    fs.writeFileSync(`storaged/forms/${userID}/${formID}.json`, JSON.stringify(formData));
}

function writeFormDB(formID, formAuthor) {
    const formDB = readFormDB();
    const fs = require('fs');

    if (!formID || !formAuthor) return false;

    const formFile = fs.readFileSync(`storaged/forms/${formAuthor}/${formID}.json`);
    if (!formFile) return false;

    const formData = JSON.parse(formFile);
    if (!formData) return false;

    const formIndex = formDB.findIndex(form => form.id === formID);
    if (formIndex === -1) {
        formDB.push({
            id: formID,
            author: formAuthor,
            title: formData.title,
            createAt: formData.createTimestamp
        });

        fs.writeFileSync(`storaged/forms/formDB.json`, JSON.stringify(formDB));
        return true;
    }

    formDB[formIndex].author = formAuthor;
    formDB[formIndex].title = formData.title;

    fs.writeFileSync(`storaged/forms/formDB.json`, JSON.stringify(formDB));
    return true;
}

function createForm(title, action, userID) {
    const fs = require('fs');
    const { v4: uuidv4 } = require('uuid');
    const formDB = readFormDB();

    if (!title || !action || !userID) return false;
    if (!fs.existsSync(`storaged/forms/${userID}/`)) fs.mkdirSync(`storaged/forms/${userID}/`);

    function createID() {
        var id = uuidv4();
        if (readFormFile(id, userID) || formDB.findIndex(form => form.id === id && form.author === userID) !== -1) return createID();
        return id;
    }
    const formId = createID();

    const data = {
        id: formId,
        title: title,
        action: action,
        author: userID,
        fields: [],
        userChoice: [],
        createTimestamp: new Date().getTime(),
        updateTimestamp: new Date().getTime(),
        enabled: true
    }

    fs.writeFileSync(`storaged/forms/${userID}/${data.id}.json`, JSON.stringify(data));
    writeFormDB(data.id, userID);

    return data.id;
}

function updateForm(formID, userID, data) {
    if (!formID || !userID || !data) return false;
    if (!data.title || !data.action || !data.fields || !data.enabled) return false;

    const formFile = readFormFile(formID, userID);
    if (!formFile) return false;

    formFile.title = data.title || formFile.title;
    formFile.action = data.action || formFile.action;
    formFile.fields = data.fields || formFile.fields;
    formFile.enabled = data.enabled || formFile.enabled;
    writeFormFile(formID, userID, formFile);
}

function readFormFields(formID, userID) {
    const formFile = readFormFile(formID, userID);
    if (!formFile) return false;

    return formFile.fields;
}

function updateFormField(formID, userID, fieldIndex, fieldData) {
    if (!formID || !userID || !fieldIndex || !fieldData) return false;

    const formFile = readFormFile(formID, userID);
    if (!formFile) return false;

    formFile.fields[fieldIndex] = fieldData;
    writeFormFile(formID, userID, formFile);
}

function deleteForm(formID, userID) {
    const fs = require('fs');
    const formDB = readFormDB();

    if (!formID || !userID) return false;

    const formIndex = formDB.findIndex(form => form.id === formID && form.author === userID);
    if (formIndex === -1) return false;

    formDB.splice(formIndex, 1);
    fs.writeFileSync(`storaged/forms/formDB.json`, JSON.stringify(formDB));
    fs.unlinkSync(`storaged/forms/${userID}/${formID}.json`);
}

function getForms(userID) {
    const formDB = readFormDB();
    const forms = formDB.filter(form => form.author === userID);
    return forms;
}

module.exports = {
    createForm,
    updateFormField,
    updateForm,
    deleteForm,
    readFormFields,
    readFormDB,
    readFormFile,
    getForms
}

