var account = {
    name: null,
    token:null
};

// 右键菜单
chrome.contextMenus.create({
    title: "乐趣分享",
    onclick: function () {
        if (account.token == null) {
            window.open("html/login.html", "登录", "width=427,height=367,top=200,left=300");
        }
    }
});

// 
function savePage() {
    if (!navigator.onLine) {
        alert("您必须联网才能保存页面！");
        return;
    }

    if (account.token == null) {
       
    }

    chrome.tabs.executeScript(null, { code: "showSavedData()" });
}

chrome.browserAction.onClicked.addListener(savePage);