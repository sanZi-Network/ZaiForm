class User {
    #_AUTH_KEY;

    constructor(authKey) {
        this.id = null;
        this.name = null;
        this.email = null;
        this.forms = null;
        this.mailVerified = null;

        this._initlized = false;
        this.#_AUTH_KEY = authKey;
        this._isFailedLogin = false;
        
        this.init();
    }

    setContent() {
        const headerAcc = document.querySelector("#acc");
        headerAcc.innerHTML = `Hello, ${this.name}`;
        headerAcc.href = `/dashboard`;
        // document.querySelector("#user-email").innerHTML = this.email;
    }

    setContentToLogin() {
        const headerAcc = document.querySelector("#acc");
        headerAcc.innerHTML = `Login / Sign Up`;
        headerAcc.href = `/login`;
    }

    async init() {
        return new Promise(async (resolve, reject) => {
            const userInfo = await this.httpRequest(`/api/getUserInfo`, "GET").then(res => {
                if (res.status !== 200) return null;
                return res.data.data;
            });

            if (!userInfo) {
                this._isFailedLogin = true;
                this.setContentToLogin();
                return reject();
            };

            this.id = userInfo.id;
            this.name = userInfo.name;
            this.email = userInfo.email;
            this.forms = userInfo.forms;
            this.mailVerified = userInfo.mailVerified;

            this._initlized = true;

            this.setContent();

            return resolve(this);
        });
    }

    logout() {
        this.#_AUTH_KEY = null;
        localStorage.removeItem("auth");
        
        this.id = null;
        this.name = null;
        this.email = null;
        this.forms = null;
        this.mailVerified = null;

        return this.setContentToLogin();
    }

    get getUserInfo() {
        if (!this._initlized) return null;
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            forms: this.forms
        };
    }

    async httpRequest(url, method, data) {
        return await fetch(url, {
            method: method,
            body: data ? JSON.stringify(data) : null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.#_AUTH_KEY
            }
        }).then(async res => {
            if (res.status === 204) return {
                status: res.status
            };
            return {
                status: res.status,
                data: await res.json()
            };
        });
    }
}

window.User = User;