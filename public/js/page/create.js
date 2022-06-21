window.execute = async () => {
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
                    <h1>Create Your Own Form</h1>
                </div>
                <div class="login-body">
                    <form action="#" method="post" id="lgb">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" id="title" name="title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea type="text" id="description" name="description"></textarea>
                        </div>
                        <div class="form-group">
                            <select id="type" name="type">
                                <option value="regular">Regular Form</option>
                                <option value="score">Score Form</option>
                            </select>
                        <div class="form-group">
                            <button type="submit" id="sbb">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `);

    document.querySelector("#lgb").addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!("userInfo" in window)) {
            alert("Try ZaiForm with a valid account.");
            return;
        }

        var form = event.target;

        form.sbb.disabled = true;
        form.sbb.innerHTML = "Sending...";

        var data = {
            action: form.type.value,
            title: form.title.value,
            description: form.description.value
        };

        var res = await window.userInfo.httpRequest("/api/createForm", "POST", data);

        console.log(res);

        if (res.status > 300) {
            alertBox("Error: " + res.message, "error");
            form.sbb.disabled = false;
            form.sbb.innerHTML = "Submit";
            return;
        }

        alertBox("Success: " + res.message, "success");
        form.sbb.innerHTML = "Sent";
    });
}