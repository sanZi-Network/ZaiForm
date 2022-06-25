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
                <div style="flex: 10 1 auto;width: 0;display: flex;flex-direction: column;flex-wrap: nowrap;min-width: 360px;">
                    <div class="dashBox">
                        <div class="dashBoxHeader open">
                            <h2>Form Description</h2>
                        </div>
                        <div class="dashBoxBody open">
                            <h2>${formDescription}</h2>
                        </div>
                    </div>
                    <div class="dashBox">
                        <div class="dashBoxHeader open">
                            <h2>Form Fields</h2>
                        </div>
                        <div class="dashBoxBody open">
                            <div class="formList" id="fldList">

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

    // TODO: fields setting
}