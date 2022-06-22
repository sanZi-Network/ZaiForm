window.pageData = {};
window.pageData.function = {};
window.pageData.data = {};
window.pageData.Interval = [];
const page = [
    {
        path: "/404",
        name: "404",
        id: "404",
    },
    {
        path: "/create",
        name: "Create",
        id: "create"
    },
    {
        path: "/login",
        name: "Login",
        id: "login"
    },
    {
        path: "/forgetPassword",
        name: "Forget Password",
        id: "forgetPassword"
    },
    {
        path: "/resetPassword",
        name: "Reset Password",
        id: "resetPassword"
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        id: "dashboard"
    },
    {
        path: "/edit/",
        name: "Edit",
        id: "edit"
    },
    {
        path: "/",
        name: "Home",
        id: "home",
    }
];

// Initialize Alert Box
function createAlertBox() {
    var toastBox = document.querySelector("#toastBox");
    if (!toastBox) {
        var toastBox = document.createElement("div");
        toastBox.classList.add("toastBox");
        toastBox.id = "toastBox";
        document.body.appendChild(toastBox);
    }

    return toastBox;
}

function alertBox(message, type = "info") {
    var toastID = Math.floor(Math.random() * 10000);
    var toastBox = createAlertBox();
    var doc = document.createElement("div");
    doc.classList.add("toastBoxMessage");
    doc.setAttribute("data-toast", toastID);
    doc.innerHTML = `<p>${message}</p>`;

    switch (type) {
        case "info":
            doc.classList.add("info");
            break;
        case "success":
            doc.classList.add("success");
            break;
        case "error":
            doc.classList.add("error");
            break;
        case "warning":
            doc.classList.add("warning");
            break;
    }
    toastBox.appendChild(doc);

    setTimeout(() => {
        var toast = document.querySelector(`[data-toast="${toastID}"]`);
        if (!toast) return;
        toast.remove();
    }, 5000);
}

function createQuestionContent(title, description) {
    var questionBox = document.querySelector("#questionBox");
    if (!questionBox) {
        var questionBox = document.createElement("div");
        questionBox.classList.add("taskBox");
        questionBox.id = "questionBox";
        questionBox.innerHTML = `
        <div class="tskbx">
            <form id="tskLst">
                <div class="taskBoxTitle">
                    <h1>${title}</h1>
                </div>
                <p style="width: 100%;">${description}</p>
                <div class="taskBoxContent" id="tskBox"></div>
            </form>
        </div>`;
        document.body.appendChild(questionBox);
    }

    return questionBox;
}

function createQuestionBox(title, description, question, callback, buttonDisplay) {
    var questID = Math.floor(Math.random() * 10000);

    var questionBox = createQuestionContent(title, description);

    var tskBox = document.querySelector("#tskBox");
    var quest = document.createElement("div");
    question.forEach((e, index) => {
        var thisID = questID + "-" + index;
        var type = "text";
        if (e.type) {
            type = e.type;
        }
        var div = document.createElement("div");

        var label = document.createElement("label");
        label.innerHTML = e.title;
        label.setAttribute("for", thisID);

        if (type !== "textarea") {
            var input = document.createElement("input");
            input.setAttribute("type", type);
            input.setAttribute("id", thisID);
            input.setAttribute("name", thisID);
            input.setAttribute("data-questID", `${thisID}-${e.id}`);
            input.setAttribute("value", e.value || "");
            if (index === 0) input.setAttribute("autofocus", true);
            if (e.required) input.setAttribute("required", "");
            if (e.attr) {
                for (var key in e.attr) {
                    input.setAttribute(key, e.attr[key]);
                }
            }
            if (e.onkeyup) input.addEventListener("keyup", e.onkeyup);
        } else {
            var input = document.createElement("textarea");
            input.setAttribute("id", thisID);
            input.setAttribute("name", thisID);
            input.setAttribute("data-questID", `${thisID}-${e.id}`);
            input.innerHTML = e.value || "";
            if (index === 0) input.setAttribute("autofocus", true);
            if (e.required) input.setAttribute("required", "");
            if (e.attr) {
                for (var key in e.attr) {
                    input.setAttribute(key, e.attr[key]);
                }
            }
            if (e.onkeyup) input.addEventListener("keyup", e.onkeyup);
        }

        div.appendChild(label);
        div.appendChild(input);
        quest.appendChild(div);
    });
    tskBox.appendChild(quest);

    var btn = document.createElement("button");
    btn.innerHTML = buttonDisplay || "Submit";
    btn.setAttribute("type", "submit");
    document.querySelector("#tskLst").appendChild(btn);

    var btnCancel = document.createElement("button");
    btnCancel.innerHTML = "Cancel";
    btnCancel.setAttribute("type", "button");
    btnCancel.style.backgroundColor = "#f44336";
    document.querySelector("#tskLst").appendChild(btnCancel);
    btnCancel.addEventListener("click", () => {
        questionBox.remove();
        callback(false);
    });

    questionBox.querySelector("#tskLst").addEventListener("submit", (event) => {
        event.preventDefault();
        var data = {};
        question.forEach((e, index) => {
            var thisID = questID + "-" + index;
            data[e.id] = document.querySelector(`[data-questID="${thisID}-${e.id}"]`).value;
        });
        callback(data);
        questionBox.remove();
    });
}

function createConfirmBox(title, description, callback) {
    var questionBox = createQuestionContent(title, description);

    var btn = document.createElement("button");
    btn.innerHTML = "Yes";
    document.querySelector("#tskLst").appendChild(btn);
    btn.addEventListener("click", (event) => {
        questionBox.remove();
        callback(true);
    });

    var btnCancel = document.createElement("button");
    btnCancel.innerHTML = "No";
    btnCancel.setAttribute("type", "button");
    btnCancel.style.backgroundColor = "#f44336";
    document.querySelector("#tskLst").appendChild(btnCancel);
    btnCancel.addEventListener("click", () => {
        questionBox.remove();
        callback(false);
    });
}


function toPageTop() {
    window.scrollTo(0, 0);
}

function setContent(content) {
    document.querySelector("#mainContent").innerHTML = content;
}

function setStyle(styleContent) {
    var style = document.querySelector("#pageStyle");
    if (!style) {
        style = document.createElement("style");
        style.id = "pageStyle";
        document.head.appendChild(style);
    }
    style.innerHTML = styleContent;
}

async function loadScript(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.text()).then(async res => {
            resolve(eval(res));
        });
    });
}

function loadPageScript(id) {
    if (page.find(e => e.id === id) === undefined) return;
    window.execute = () => { };
    fetch(`/js/page/${id}.js`).then(res => res.text()).then(res => {
        eval(res);
        window.execute();
    })
};

function loadPage(path, orgPath) {
    // if (path === orgPath) return;
    path = new URL("http://example.com" + path).pathname || location.pathname;

    if (!page.find(e => path.includes(e.path))) path = "/404";

    setContent("");
    setStyle("");
    hideMenu();
    window.pageData.function = {};
    window.pageData.data = {};
    if (window.pageData.Interval.length > 0) {
        window.pageData.Interval.forEach(e => clearInterval(e));
    }
    window.pageData.Interval = [];

    loadPageScript(page.find(e => path.includes(e.path)).id);
    toPageTop();
}

function goPage(path) {
    var orgPath = location.pathname;
    window.history.pushState({}, "", path);
    loadPage(path, orgPath);
}

document.addEventListener("click", event => {
    try {
        var ele = event.target.closest("a");
    } catch (err) {
        return;
    }
    if (ele) {
        event.preventDefault();
        var url = ele.href; 
        if (url === undefined || url === "" || url === null || url === location.href + "#" || url === location.href || url === "#") return;
        var urlObject = new URL(url);
        if (urlObject.host === window.location.host) {
            goPage(urlObject.pathname + urlObject.search);
            return;
        }
        location.href = url;
    }
});

window.onload = async () => {
    localStorage.getItem("theme") ? window.updateThemeMode(localStorage.getItem("theme")) : (window.matchMedia('(prefers-color-scheme: dark)').matches ? window.updateThemeMode("dark") : window.updateThemeMode("light"));
    document.querySelector(".theme-icon").addEventListener("click", () => {
        toggleLocalStorageItem();
    });

    await loadScript("/js/lib/user.class.js");
    if (localStorage.getItem("auth")) {
        window.userInfo = new User(localStorage.getItem("auth"));
        var t = setInterval(() => {
            if (window.userInfo._initlized) clearInterval(t);
            if (window.userInfo._isFailedLogin) {
                localStorage.removeItem("auth");
                clearInterval(t);
            }
        }, 100);
    }

    loadPage(location.pathname);
}

window.onpopstate = (event) => {
    event.preventDefault();
    goPage(location.pathname);
}

function inputStyle() {
    var inputs = document.getElementsByTagName("input");
    var textarea = document.getElementsByTagName("textarea");
    Array.from([...inputs, ...textarea]).forEach(e => {
        if (e.value !== "") e.parentElement.classList.add("active");
        e.addEventListener("focusin", ev => {
            e.parentElement.classList.add("active");
        });

        e.addEventListener("focusout", ev => {
            if (e.value === "") {
                e.parentElement.classList.remove("active");
            }
        });
    });
}

function showMenu() {
    var menu = document.querySelector(".menu");
    var menuBtn = document.querySelector("#menuBtn");
    menu.classList.toggle("open");

    if (!menu.classList.contains("open")) {
        menuBtn.classList.add("open");
        menuBtn.classList.remove("close");
    } else {
        menuBtn.classList.remove("open");
        menuBtn.classList.add("close");
    }
}

function hideMenu() {
    var menu = document.querySelector(".menu");
    var menuBtn = document.querySelector("#menuBtn");
    menu.classList.remove("open");
    menuBtn.classList.add("open");
    menuBtn.classList.remove("close");
}

document.addEventListener("DOMNodeInserted", (ev) => {
    inputStyle();
}, false);

function toggleLocalStorageItem() {
    var theme = localStorage.getItem("theme");
    if (theme === "dark") {
        window.updateThemeMode("light");
    } else {
        window.updateThemeMode("dark");
    }
}