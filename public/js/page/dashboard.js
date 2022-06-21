window.execute = async () => {
    if (!window.userInfo) {
        goPage("/login?redirect=" + location.pathname);
        return;
    };

    const userName = window.userInfo.name;
    const userEmail = window.userInfo.email;
    const userID = window.userInfo.id;
    const forms = window.userInfo.forms;

    function timestampFormat(timestamp) {
        var date = new Date(timestamp);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    }

    var formList = "";

    if (forms.length === 0) {
        formList = "<div class='formList'>You have no forms.</div>";
    } else {
        formList = "<div class='formList'>";
        forms.forEach(e => {
            formList += `
                <div class="formBox">
                    <div class="formHeader">
                        <h1>${e.title}</h1>
                        <div class="formTimeInfo">
                            <h3>Created:</h3>
                            <p>${timestampFormat(e.createAt)}</p>
                        </div>
                        <span class="formID">${e.id}</span>
                    </div>
                    <div style="flex: 1;"></div>
                    <div class="buttons">
                        <a data-extra="Open"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        <a data-extra="Edit"><i class="fas fa-edit"></i></a>
                        <a data-extra="Analyze"><i class="fas fa-chart-line"></i></a>
                        <a data-extra="Delete"><i class="fas fa-trash-alt"></i></a>
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
            margin-top: 20px;
        }
        .dashBoxList {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 50px;
        }
        .dashBoxList div {
            flex: 1 1 auto;
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
            color: var(--color-card-text) !important;
        }
        .formBox {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            background-color: #000;
            border-radius: 15px;
            padding: 20px;
            position: relative;
        }
        .formBox .buttons {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-end;
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
                <div>
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Fast Options</h2>
                        </div>
                        <div class="dashBoxBody">
                            <a class="btn" href="/create">Create New Form</a>
                        </div>
                    </div>
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Profile</h2>
                        </div>
                        <div class="dashBoxBody">
                            <h1>${userName}</h1>
                            <p style="font-size: .5rem; font-weight: 600;">${userID}</p>
                            <a class="btn">Edit Profile</a>
                        </div>
                    </div>
                </div>
                <div class="dashBox" style="flex: 10 1 auto;width: 60%;">
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
}