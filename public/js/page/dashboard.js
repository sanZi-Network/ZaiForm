window.execute = async () => {
    if (!window.userInfo || window.userInfo._isFailedLogin) {
        goPage("/login?redirect=" + location.pathname);
        return;
    };

    const userName = window.userInfo.name;
    const userEmail = window.userInfo.email;
    const userMailVerified = window.userInfo.mailVerified;
    const userID = window.userInfo.id;
    const forms = window.userInfo.forms;

    function timestampFormat(timestamp) {
        var date = new Date(timestamp);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    }

    var formList = "";

    if (forms.length === 0) {
        formList = "<div class='formList' style='text-align: center;font-size: 3rem;font-weight: 600;'>You have no forms.</div>";
    } else {
        formList = "<div class='formList'>";
        forms.forEach(e => {
            formList += `
                <div class="formBox" data-formid="${e.id}">
                    <div class="formHeader">
                        <h1 class="formName" title="${e.title}">${e.title}</h1>
                        <div class="formTimeInfo">
                            <h3>Created:</h3>
                            <p>${timestampFormat(e.createAt)}</p>
                        </div>
                        <span class="formID">${e.id}</span>
                    </div>
                    <div style="flex: 1;"></div>
                    <div class="buttons">
                        <a data-extra="Open" class="fmOpen"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        <a data-extra="Edit" class="fmEdit"><i class="fas fa-edit"></i></a>
                        <a data-extra="Analyze" class="fmAnalyze"><i class="fas fa-chart-line"></i></a>
                        <a data-extra="Delete" class="fmDelete"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </div>
            `;
        });
        formList += "</div>";
    }

    setStyle(`
        section {
            justify-content: unset !important;
            display: block !important;
        }
        .section .md {
            margin: 0 auto;
            width: 100%;
        }
        .page { 
            margin-top: 50px;
            width: 80%;
        }
        a.btn {
            color: #fff;
            background: #3e67ff;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            display: block;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
        }
        a.btn#editPf {
            margin-top: 20px;
        }
        a.btn i {
            margin-right: 5px;
        }
        .dashBoxList {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 50px;
        }
        .dashBox {
            padding: 20px;
            margin: 10px;
            background-color: var(--color-card-bg);
            border-radius: 15px;
            min-width: 300px;
            color: var(--color-card-text) !important;
        }
        .dashBox .dashBoxHeader {
            margin-bottom: 15px;
            color: var(--color-card-text);
        }
        .dashBox .dashBoxBody h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--color-card-text);
        }
        .dashBox .dashBoxHeader h2,
        .dashBox .dashBoxBody h2,
        .dashBox .dashBoxBody p,
        .dashBox .dashBoxBody div {
            color: var(--color-card-text);
        }
        p.notVerify {
            color: #ff7600 !important;
            font-size: 1rem;
            font-weight: 600;
        }
        .formBox {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            background-color: #000;
            border-radius: 15px;
            padding: 20px;
            position: relative;
            flex-direction: column;
        }
        .formBox .buttons {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }
        .formBox:hover {
            background-color: #3e67ff;
            box-shadow: 0px 5px 10px 3px #000;
        }
        .formBox .formHeader {
            max-width: 100%;
        }
        .formBox .formHeader h1 {
            margin-left: 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .formBox .formHeader .formTimeInfo h3 {
            margin-left: 10px;
            margin-top: 5px;
            color: var(--color-card-text);
        }
        .formBox .formHeader .formTimeInfo p {
            margin-left: 30px;
            margin-top: 5px;
        }
        .formBox .formHeader span {
            font-size: .5rem;
            color: #ffffff40;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 5px;
            font-family: monospace;
        }
        .formBox .formHeader .formID {
            position: absolute;
            bottom: 0;
        }
        .formBox a i {
            font-size: 2rem;
            padding: 15px;
            color: var(--color-card-text);
        }
        .formBox a {
            border-radius: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 60px;
            margin-right: 5px;
        }
        .formBox a:hover {
            background: #0031b9;
        }
        .formBox a:active {
            background: #0031b9;
        }
    `);
    setContent(`
        <div class="home">
            <div class="intro">
                <h1>ZaiForm Dashboard</h1>
            </div>
            <div class="dashBoxList" style="width: 100%;">
                <div style="flex: 1;">
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Fast Control</h2>
                        </div>
                        <div class="dashBoxBody">
                            <a class="btn" href="/create"><i class="fa-solid fa-circle-plus"></i> Create New Form</a>
                            <a class="btn" href="/login?action=logout" style="background-color: #ff2e2e;"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
                        </div>
                    </div>
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Profile</h2>
                        </div>
                        <div class="dashBoxBody">
                            <h1 id="disName">${userName}</h1>
                            ${!userMailVerified ? `<p class="notVerify">Email not verified</p>` : ``}
                            <p style="font-size: .5rem; font-weight: 600;" >${userID}</p>
                            <a class="btn" id="editPf"><i class="fa-solid fa-pen-to-square"></i> Edit Profile</a>
                        </div>
                    </div>
                </div>
                <div class="dashBox" style="flex: 10 1 auto;width: 0;">
                    <div class="dashBoxHeader">
                        <h2>Your Forms</h2>
                    </div>
                    <div class="dashBoxBody">
                        <div class="formList">
                            ${formList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    document.getElementById("editPf").addEventListener("click", () => {
        createQuestionBox("Edit Profile", "Update your ZaiForm profile.", [
            {
                type: "text",
                id: "name",
                title: "Name",
                value: userName,
                onkeyup: (event) => {
                    event.target.value = event.target.value.replace(/[\W]/g, '');
                }
            },
            {
                type: "email",
                id: "email",
                title: "Email",
                value: userEmail
            },
            {
                type: "password",
                id: "password",
                title: "Password"
            }
        ], async (data) => {
            if (!data) return;

            var request = await window.userInfo.httpRequest("/api/changeProfile", "PUT", {
                name: data.name,
                email: data.email,
                password: data.password
            });

            if (request.status === 204) {
                alertBox("Profile Updated Successfully", "success");
            
                try {
                    await window.userInfo.init();
                    goPage("/dashboard");
                } catch (e) {
                    goPage("/login");
                }
            }
        }, "Save");
    });

    document.querySelectorAll(".fmDelete").forEach(form => {
        form.addEventListener("click", async () => {
            var formName = form.parentElement.parentElement.querySelector(".formName").innerText;
            var formID = form.parentElement.parentElement.getAttribute("data-formid");

            createQuestionBox("Delete Form", `Are you sure you want to delete <font style="color: red;">${formName}</font>? Please type the form name to confirm.`, [
                {
                    type: "text",
                    id: "name",
                    title: "Form Name"
                }
            ], async (data) => {
                if (!data) {
                    return;
                }

                if (data.name !== formName) {
                    alertBox("Form name does not match.", "error");
                    return;
                }

                var request = await window.userInfo.httpRequest("/api/editForm", "DELETE", {
                    id: formID
                });

                if (request.status === 204) {
                    alertBox("Form Deleted Successfully", "success");

                    await window.userInfo.init();

                    goPage("/dashboard");
                    return;
                }

                alertBox("Form could not be deleted.", "error");
            });
        });
    });

    document.querySelectorAll(".fmEdit").forEach(form => {
        form.addEventListener("click", async () => {
            var formID = form.parentElement.parentElement.getAttribute("data-formid");
            goPage(`/edit/${formID}`);
        });
    });
}