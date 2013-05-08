(function () {
    $(function () {
        bindEvent();
    });

    function bindEvent() {
        $("#login").click(function () {
            if (login()) {
                var background = chrome.extension.getBackgroundPage();

                background.account.token = "loginin";
                chrome.browserAction.setPopup({ popup: "" });

                if (window.opener.tab) {
                    chrome.tabs.sendRequest(window.opener.tab.id, {});
                    window.close();
                    return;
                }

                chrome.tabs.getSelected(null, function (tab) {                                    
                    background.contentScriptDoCollect();
                    window.close();
                });
            }
        });

        $("#rememberMe img").click(function () {
            if (this.status == "1") {
                this.status = "0";
                this.src = "../images/switch-off.png";
            } else {
                this.status = "1";
                this.src = "../images/switch-on.png";
            }
        });
    }

    function login() {
        var userName = $("#txtUserName"),
            password = $("#txtPassword"),
            strUserName = $.trim(userName.val()),
            strPassword = $.trim(password.val());

        if (strUserName.length == 0 || strPassword.length == 0) {
            strUserName.length == 0 ? (userName.focus(), null) : (password.focus(), null);
            return false;
        }

        return true;
    }
})();