/*
 * ZaiForm Server Main Script
 * Created by: Muisnow <muisnowbusiness@gmail.com>
 *
 * Copyright 2022 The ZaiForm Authors.
 * Copyright 2022 Muisnow Developer.
 * 
 * Repository: https://github.com/sanZi-Network/ZaiForm
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { generateKeyPairSync } = require('crypto');
const api = require('./api/api');
const cors = require('cors');

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
app.use(cors({
    origin: (new URL(process.env.HOST)).hostname,
    credentials: true
}));
app.use((req, res, next) => {
    if (req.protocol + '://' + req.get('host') !== process.env.HOST) {
        res.redirect(`${process.env.HOST}${req.url}`);
    }
    next();
});
app.enable('trust proxy');

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

// API
// Method GET
app.get("/api/getUserInfo", (req, res) => api.getUserInfo(req, res));
app.get("/api/viewForm/:form", (req, res) => api.viewForm(req, res));
app.get("/api/sysAuth", (req, res) => api.sysAuth(req, res));

// Method POST
app.post("/api/sysAuth", (req, res) => api.sysAuth(req, res));
app.post("/api/createForm", (req, res) => api.createForm(req, res));

// Method PUT
app.put("/api/changeProfile", (req, res) => api.changeProfile(req, res));
app.put("/api/editForm", (req, res) => api.viewForm(req, res));

app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));