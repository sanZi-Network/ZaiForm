window.execute = async () => {
    // Login

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

            var win = window.open(authID.data.authURI, 'Authentication', config = 'height=800,width=500');
            // check if window is closed
            var check = setInterval(() => {
                if (win.closed) {
                    clearInterval(check);
                    var loginDt = localStorage.getItem("auth");
                    if (!loginDt) {
                        alertBox("Error: Authentication failed", "error");
                        return;
                    }
                    alertBox("Successfully logged in", "success");

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
                    <form action="/login" method="post">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password">
                        </div>
                        <div class="form-group">
                            <button type="submit">Login</button>
                        </div>
                        <div class="extra">
                            <span><a href="/register">Register</a></span>
                            <span><a href="/forgot-password">Forgot Password</a></span>
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

    document.querySelector("#sanZiAuth").addEventListener("click", async (event) => {
        var btn = event.target;
        if (btn.disabled) return;
        btn.disabled = true;
        var text = btn.innerHTML;
        btn.innerHTML = "Authenticating...";
        await loginWithSanZi();
        btn.innerHTML = text;
        btn.disabled = false;
    });
}
