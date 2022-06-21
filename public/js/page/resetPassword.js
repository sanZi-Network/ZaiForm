window.execute = async () => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (!token) return goPage("/forgetPassword");
    
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
                    <h1>Reset Password</h1>
                </div>
                <div class="login-body">
                    <form action="#" method="post" id="lgb">
                        <div class="form-group">
                            <label for="pass1">New Password</label>
                            <input type="password" id="pass1" name="pass1">
                        </div>
                        <div class="form-group">
                            <label for="pass2">Confirm Password</label>
                            <input type="password" id="pass2" name="pass2">
                        </div>
                        <div class="form-group">
                            <button type="submit" id="sbb">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `);

    document.querySelector("#lgb").addEventListener("submit", async (event) => {
        event.preventDefault();

        var form = event.target;

        form.sbb.disabled = true;
        form.sbb.innerHTML = "Sending...";

        if (form.pass1.value !== form.pass2.value) {
            form.sbb.disabled = false;
            form.sbb.innerHTML = "Submit";
            return alertBox("Password not match", "error");
        }

        var data = {
            password: form.pass1.value,
            token: token,
            action: "newPassword"
        };
        var res = await fetch("/api/sysAuth", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.status === 204) {
                alertBox("Password changed", "success")
                return {
                    status: 200
                };
            };
            return res.json();
        }).catch(err => {
            console.log(err);
            alertBox("Error: " + err.message, "error");
        });

        if (res.status !== 200) {
            alertBox("Error: " + res.message, "error");
            return;
        }

        goPage("/login");
    });
}