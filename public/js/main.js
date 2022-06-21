window.pageData = {};
window.pageData.function = {};
window.pageData.data = {};
window.pageData.Interval = [];
const page = [
    {
        path: "/",
        name: "Home",
        id: "home",
    },
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

    if (!page.find(e => e.path === location.pathname)) path = "/404";

    setContent("");
    setStyle("");
    hideMenu();
    window.pageData.function = {};
    window.pageData.data = {};
    if (window.pageData.Interval.length > 0) {
        window.pageData.Interval.forEach(e => clearInterval(e));
    }
    window.pageData.Interval = [];

    loadPageScript(page.find(e => e.path === path).id);
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
    localStorage.getItem("theme") ? window.updateThemeMode(localStorage.getItem("theme")) : (window.matchMedia('(prefers-color-scheme: dark)').matches ? window.updateThemeMode("dark") : window.updateThemeMode("light"));
    document.querySelector(".theme-icon").addEventListener("click", () => {
        toggleLocalStorageItem();
    });
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