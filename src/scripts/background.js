// 右键菜单
chrome.contextMenus.create({ title: "乐趣分享" });

var account;

account = {
    name: "abcd"
}

// 
function savePage() {
    if (!navigator.onLine) {
        alert("您必须联网才能保存页面！");
        return;
    }
    chrome.tabs.executeScript(null, { code: "showSavedData()" });
}

chrome.browserAction.onClicked.addListener(savePage);