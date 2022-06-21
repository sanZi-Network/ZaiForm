class User {
    #_AUTH_KEY;

    constructor(authKey) {
        this.id = null;
        this.name = null;
        this.email = null;
        this.forms = null;

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

    async init() {
        if (this._initlized) return;

        const userInfo = await fetch(`/api/getUserInfo`, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + this.#_AUTH_KEY
            }
        }).then(res => res.json()).then(res => {
            if (res.status !== 200) return null;
            return res.data;
        });

        if (!userInfo) {
            this._isFailedLogin = true;
            return;
        };

        this.id = userInfo.id;
        this.name = userInfo.name;
        this.email = userInfo.email;
        this.forms = userInfo.forms;

        this._initlized = true;

        this.setContent();

        return this;
    }

    get getUserInfo() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }

    async httpRequest(url, method, data) {
        const res = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.#_AUTH_KEY
            }
        }).then(res => res.json());

        return res;
    }
}

window.User = User;