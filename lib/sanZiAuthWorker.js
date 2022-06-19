function checkSanZiAvailable() {
    if (!process.env.SANZIAUTH_APPID || !process.env.SANZIAUTH_APPKEY) return false;
    return true;
}

function createSanZiAuthToken(ipAddr) {
    if (!ipAddr) return false;
    if (!checkSanZiAvailable()) return false;

    const http = require("https");
    const options = {
        hostname: "account.3zh-studio.com",
        port: 443,
        path: "/api/authtkn.php",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const data = JSON.stringify({
        authIP: ipAddr,
        authAPP: process.env.SANZIAUTH_APPID,
        authAPPKey: process.env.SANZIAUTH_APPKEY
    });

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            var chk = [];

            res.on('data', (chunk) => {
                chk.push(chunk);
            });

            res.on('end', () => {
                var data = JSON.parse(chk.join(''));
                if (data.code === 0) {
                    resolve({
                        authTkn: data.data.authTkn,
                        authURI: `https://account.3zh-studio.com/authorize.php?app_id=${process.env.SANZIAUTH_APPID}&authid=${data.data.authTkn}`
                    });
                } else {
                    reject(data);
                }
            });

        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });

        req.write(data);
        req.end();
    });
}

function getSanZiUserInfo(authTkn) {
    if (!authTkn) return false;
    if(!checkSanZiAvailable()) return false;

    const http = require("https");
    const options = {
        hostname: "account.3zh-studio.com",
        port: 443,
        path: "/api/loginusercheck.php",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    const data = JSON.stringify({
        AppID: process.env.SANZIAUTH_APPID,
        AppKey: process.env.SANZIAUTH_APPKEY,
        Token: authTkn
    });

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            var chk = [];

            res.on('data', (chunk) => {
                chk.push(chunk);
            });

            res.on('end', () => {
                var data = JSON.parse(chk.join(''));
                if (data.message === "success") {
                    resolve(data);
                } else {
                    reject(data);
                }
            });

        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });

        req.write(data);
        req.end();
    });
}

module.exports = {
    createSanZiAuthToken,
    getSanZiUserInfo,
    checkSanZiAvailable
}