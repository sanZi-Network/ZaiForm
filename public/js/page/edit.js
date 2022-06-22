window.execute = async () => {
    if (!window.userInfo || window.userInfo._isFailedLogin) {
        goPage("/login?redirect=" + location.pathname);
        return;
    };

    const url = new URL(window.location.href);

    const formData = await window.userInfo.httpRequest(`/api/viewForm/${url.pathname.split("/")[2]}`, "GET");
    
    
    const formName = formData.data.data.title;
    const formId = formData.data.data.id;
    const formFields = formData.data.data.fields;
    const formDescription = formData.data.data.description;

    function timestampFormat(timestamp) {
        var date = new Date(timestamp);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
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
        .dashBox .dashBoxBody p {
            margin-left: 15px;
            color: var(--color-card-text);
        }
        .dashBox .dashBoxBody h3,
        .dashBox .dashBoxBody span {
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
                <h1>ZaiForm Editor</h1>
            </div>
            <div class="dashBoxList" style="width: 100%;">
                <div style="flex: 1;">
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Form Information</h2>
                        </div>
                        <div class="dashBoxBody">
                            <h1 id="disName">${formName}</h1>
                            <span style="font-size: .5rem; font-weight: 600;">${formId}</span>
                            <h3>Created at</h3>
                            <p>${timestampFormat(formData.data.data.createTimestamp)}</p>
                            <a class="btn" id="editPf"><i class="fa-solid fa-pen-to-square"></i> Edit Form</a>
                        </div>
                    </div>
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Fast Control</h2>
                        </div>
                        <div class="dashBoxBody">
                            <a class="btn" href="/dashboard"><i class="fa-solid fa-angle-left"></i> Back To Dashboard</a>
                            <a class="btn"><i class="fa-solid fa-circle-plus"></i> Create New Field</a>
                            <a class="btn"><i class="fa-solid fa-sliders"></i> Form Setting</a>
                            <a class="btn"><i class="fas fa-chart-line"></i> View Analytics</a>
                            <div class="separate"><span>Advanced</span></div>
                            <a class="btn" data-extra="Make form invisible"><i class="fa-solid fa-eye-slash"></i> Disable Form</a>
                            <a class="btn" style="background-color: #ff2e2e;" data-extra="Change the owner of this form"><i class="fa-solid fa-rotate-left"></i> Change Owner</a>
                            <a class="btn fmDelete" style="background-color: #ff2e2e;" data-extra="Delete this form (Warning this will FULLY CLEAN the data)"><i class="fas fa-trash-alt"></i> Delete Form</a>
                        </div>
                    </div>
                </div>
                <div style="flex: 10 1 auto;width: 0;display: flex;flex-direction: column;flex-wrap: nowrap;min-width: 340px;">
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Form Description</h2>
                        </div>
                        <div class="dashBoxBody">
                            <h2>${formDescription}</h2>
                        </div>
                    </div>
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Form Fields</h2>
                        </div>
                        <div class="dashBoxBody">
                            <div class="formList">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    document.querySelector(".fmDelete").addEventListener("click", async () => {
        createQuestionBox("Delete Form", `Are you sure you want to delete <font style="color: red;">${formName}</font>? Please type the form name to confirm.`, [{
            type: "text",
            id: "name",
            title: "Form Name"
        }], async (data) => {
            if (!data) {
                return;
            }

            if (data.name !== formName) {
                alertBox("Form name does not match.", "error");
                return;
            }

            var request = await window.userInfo.httpRequest("/api/editForm", "DELETE", {
                id: formId
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

    document.querySelector("#editPf").addEventListener("click", async () => {
        createQuestionBox("Edit Form", "Edit the form name and description.", [
            {
                type: "text",
                id: "name",
                title: "Form Name",
                value: formName
            },
            {
                type: "textarea",
                id: "description",
                title: "Form Description",
                value: formDescription
            }
        ], async (data) => {
            if (!data) {
                return;
            }

            var request = await window.userInfo.httpRequest("/api/editForm", "PUT", {
                id: formId,
                title: data.name,
                description: data.description
            });

            if (request.status > 300) {
                alertBox("Form could not be edited.", "error");
                return;
            }

            alertBox("Form Edited Successfully", "success");
            goPage(url.pathname);
        });
    });
}