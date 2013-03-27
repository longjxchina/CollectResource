/*(function () {
    function n() {
        var e = document.getElementById("subtext-field");
        e.setAttribute("class", ""),
        e.innerHTML = "You can log into Pocket with your existing Read It Later account.";
        var t = document.getElementById("username-field"),
        n = document.getElementById("password-field");
        t.value = "",
        n.value = ""
    }
    function r(e) {
        if (isSafari()) {
            var t = safari.application.activeBrowserWindow.openTab();
            t.url = e,
            safari.extension.popovers[0].hide()
        } else chrome.tabs.create({
            url: e
        },
        function (e) {
            chrome.tabs.update(e.id, {
                selected: !0
            })
        })
    }
    function i() {
        getCurrentTab(function (e) {
            s(e)
        })
    }
    function s(e) {
        var t = document.getElementById("subtext-field");
        t.setAttribute("class", ""),
        t.innerHTML = "Logging in...";
        var n = document.getElementById("username-field").value,
        r = document.getElementById("password-field").value,
        i = function () {
            if (isChrome()) this.close();
            else if (isSafari()) {
                sendMessageToTab(e, {
                    action: "updateOptions"
                }),
                safari.extension.popovers[0].hide();
                var t = safari.extension.toolbarItems;
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.idenfifier === "pocket" && r.popover && (r.popover = null),
                    r.validate()
                }
                safari.extension.removePopover("com.ideashower.pocket.safari.login.popover")
            }
        },
        s = function (e) {
            t.setAttribute("class", "error"),
            t.innerHTML = "The username and or password you entered was incorrect.",
            t.style.display = "block"
        };
        if (isChrome()) {
            var o = {
                tab: e,
                action: "login",
                username: n,
                password: r
            };
            sendMessage(o,
            function (e) {
                e.status == "error" ? s(e.error) : e.status == "success" && i()
            })
        } else isSafari() && safari.extension.globalPage.contentWindow.ril.login(n, r, {
            success: i,
            error: s
        })
    }
    function o() {
        event.keyCode == "13" && i()
    }
    function u() {
        $("#login-button-link").click(function (e) {
            i(),
            e.preventDefault()
        }),
        $("#create-account-link").click(function (e) {
            r(t),
            e.preventDefault()
        }),
        $("#forgot-password-link").click(function (t) {
            r(e),
            t.preventDefault()
        }),
        isSafari() ? window.onkeydown = o : window.onkeyup = o,
        setTimeout(function () {
            $("#username-field").focus()
        },
        200)
    }
    var e = "http://getpocket.com/forgot/",
    t;
    isChrome() ? t = "http://getpocket.com/signup/?src=chromex" : t = "http://getpocket.com/signup/?src=safarix",
    window.reset = n,
    window.onload = u
})();*/


(function () {
    $(function () {
        bindEvent();
    });

    function bindEvent() {
        $("#login-button-link").click(function () {
            if (login()) {
                var background = chrome.extension.getBackgroundPage();
                background.account.token = "mytoken";
                window.close();
            }
        });
    }

    function login() {
        var userName = $("#username-field"),
            password = $("#password-field"),
            msgBox = $("#subtext-field"),
            strUserName = $.trim(userName.val()),
            strPassword = $.trim(password.val());

        if (strUserName.length == 0 || strPassword.length == 0) {
            strUserName.length == 0 ? (userName.focus(), null) : (password.focus(), null);
            msgBox.html("用户名和密码不能为空，请重新输入！");
            return false;
        }

        return true;
    }
})();