window.execute = async () => {
    // Login
    const url = new URL(window.location.href);

    if (url.searchParams.get("action") === "logout") {
        if (window.userInfo) {
            await window.userInfo.logout();
            window.userInfo = null;
        }
        goPage("/login");
        return;
    }

    if (window.userInfo && !window.userInfo._isFailedLogin) {
        goPage("/dashboard");
        return;
    }

    var logPage = "";

    function loginSuccess() {
        window.userInfo = new User(localStorage.getItem("auth"));
        if (url.searchParams.get("redirect")) {
            goPage(url.searchParams.get("redirect"));
            return;
        }
        goPage("/dashboard");
    }

    function loginWithSanZi() {
        return new Promise(async (resolve, reject) => {
            var authID = await fetch("/api/sysAuth", {
                method: "POST",
                body: JSON.stringify({
                    action: "sanZiLogin"
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).catch(err => {
                console.log(err);
                alertBox("Error: " + err.message, "error");
            });

            if (authID.status !== 200) {
                alertBox("Error: " + authID.message, "error");
                return resolve();
            }

            var win = window.open(authID.data.authURI, 'Authentication', config = 'height=800,width=500');
            // check if window is closed
            var check = setInterval(() => {
                if (win.closed) {
                    clearInterval(check);
                    var loginDt = localStorage.getItem("auth");
                    if (!loginDt) {
                        alertBox("Error: Authentication failed", "error");
                        resolve();
                        return;
                    }
                    alertBox("Successfully logged in", "success");
                    loginSuccess();
                    resolve();
                }
            }, 1000);
        });
    }

    setStyle(`
        .page {
            margin: 0 auto;
            width: unset !important;
        }
        .login {
            margin: 0 auto;
        }
        .login-form {
            width: 400px;
            margin: 0 auto;
        }
        .login-header {
            padding: 30px;
            background-color: var(--color-bg);
            border-radius: 15px;
            margin: 15px;
            flex: 1;
            min-width: 235px;
            box-shadow: 0px 5px 10px 3px #000;
        }
        .login-header h1 {
            font-size: 2rem;
            font-weight: 700;
        }
        .login-body {
            padding: 30px;
            background-color: var(--color-bg);
            box-shadow: 0px 5px 10px 3px #000;
            border-radius: 15px;
            margin: 15px;
            flex: 1;
            min-width: 235px;
        }
        .login-body form {
            margin-bottom: 1rem;
        }
        .login-body form .form-group {
            margin-bottom: 1rem;
        }
        .login-body form .extra span:not(:last-child)::after {
            display: inline-block;
            content: "•";
            margin: 0 5px;
        }
        .extra-login a {
            color: #fff;
            background: #3e67ff;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            display: block;
            text-align: center;
            margin: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `);
    setContent(`
        <div class="login">
            <div class="login-form">
                <div class="login-header">
                    <h1>Login to ZaiForm</h1>
                </div>
                <div class="login-body">
                    <form action="#" method="post" id="lgb">
                        <div id="logData">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" autofocus>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password">
                            </div>
                            <div class="form-group">
                                <button type="submit" id="logBtn">Login</button>
                            </div>
                        </div>
                        <div class="extra">
                            <span><a id="chLogMod">Register</a></span>
                            <span><a href="/forgetPassword">Forgot Password</a></span>
                        </div>
                    </form>
                    <div class="separate"><span>OR</span></div>
                    <div class="extra-login">
                        <a href="#" id="sanZiAuth">Login with <img src="/img/sanZi/dark.png" height="24" style="margin: 5px;" /></a>
                    </div>
                </div>
            </div>
        </div>
    `);

    document.querySelector("#username").addEventListener("keyup", (event) => {
        event.target.value = event.target.value.replace(/[\W]/g, '');
    });

    document.querySelector("#sanZiAuth").addEventListener("click", async (event) => {
        event.preventDefault();
        var btn = document.querySelector("#sanZiAuth");
        if (btn.disabled === undefined) btn.disabled = null; 
        if (btn.disabled) return;
        btn.disabled = true;
        var text = btn.innerHTML;
        btn.innerHTML = "Authenticating...";
        await loginWithSanZi();
        btn.innerHTML = text;
        btn.disabled = false;
    });

    document.querySelector("#lgb").addEventListener("submit", async (event) => {
        event.preventDefault();
        var form = event.target;
        var emailInput = form.querySelector("#email");
        var loginType = "login";

        if (emailInput) loginType = "register";
        
        var data = {
            username: form.username.value,
            email: emailInput ? emailInput.value : null,
            password: form.password.value,
            action: loginType
        };
        var res = await fetch("/api/sysAuth", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).catch(err => {
            console.log(err);
            alertBox("Error: " + err.message, "error");
        });

        if (res.status > 300) {
            alertBox("Error: " + res.message, "error");
            return;
        }

        alertBox("Successfully logged in", "success");
        localStorage.setItem("auth", res.data.token);
        loginSuccess();
    });

    document.querySelector("#chLogMod").addEventListener("click", (event) => {
        event.preventDefault();
        var displayName = document.querySelector("#chLogMod").innerHTML === "Login" ? "Register" : "Login";
        var btnDisplayName = displayName === "Register" ? "Login" : "Register";
        if (!logPage) {
            logPage = document.querySelector("#logData").innerHTML;
            document.querySelector("#logData").innerHTML = `<div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" id="email" name="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password">
            </div>
            <div class="form-group">
                <button type="submit" id="logBtn">Login</button>
            </div>`;
            document.querySelector("#chLogMod").innerHTML = displayName;
            document.querySelector("#logBtn").innerHTML = btnDisplayName;

            return;
        }
        var anthpage = logPage;
        logPage = document.querySelector("#logData").innerHTML;
        document.querySelector("#logData").innerHTML = anthpage;
        document.querySelector("#chLogMod").innerHTML = displayName;
        document.querySelector("#logBtn").innerHTML = btnDisplayName;
    });
}
