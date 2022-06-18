/*
 * ZaiForm Server Main Script
 * Created by: Muisnow <muisnowbusiness@gmail.com>
 *
 * Copyright 2022 The ZaiForm Authors.
 * Copyright 2022 Muisnow Developer.
 * 
 * Repository: https://github.com/sanZi-Network/ZaiForm
 */

const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const { generateKeyPairSync } = require('crypto');
const api = require('./api/api');

require('dotenv').config();

const PORT = process.env.PORT || 1287;

if (!fs.existsSync("storaged")) fs.mkdirSync("storaged");
if (!fs.existsSync("storaged/accounts")) fs.mkdirSync("storaged/accounts");
if (!fs.existsSync("storaged/forms")) fs.mkdirSync("storaged/forms");
if (!fs.existsSync("storaged/authPrivate.key") || !fs.existsSync("storaged/authPublic.key")) {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    fs.writeFileSync("storaged/authPrivate.key", privateKey);
    fs.writeFileSync("storaged/authPublic.pem", publicKey);
}

app.listen(PORT, () => {
    console.log("".padStart(60, '='));
    console.log("\x1b[32m\x1b[5m" + "[Server Started".padStart(37, " ") + "]\x1b[0m");
    console.log();
    console.log(`      * Listening on port:`.padEnd(30, " ") + `${PORT}`);
    console.log("      * Server is running on:".padEnd(30, " ") + `http://localhost:${PORT}`);
    console.log();
    console.log("".padStart(60, '='));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.post("/api/sysAuth", (req, res) => api.sysAuth(req, res));
app.put("/api/changeProfile", (req, res) => api.changeProfile(req, res));