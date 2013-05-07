﻿/*
    permission:
	    "chrome-extension:\/\/*\/*"
	    "chrome-devtools:\/\/*\/*"
*/

var account = {
    name: null,
    token:null
};

// 右键菜单
chrome.contextMenus.create({
    title: "乐趣分享",
    contexts: ["page", "frame", "editable", "image", "video", "audio", "link", "selection"],
    onclick: function (info, tab) {
        if (account.token == null) {
            window.tab = tab;            
            window.open("html/login.html", "登录", "width=325,height=300,top=200,left=300");
        }
        else {
            chrome.tabs.sendRequest(tab.id, { info: info, tab: tab });
        }
    }
});

// 
function savePage() {
    if (!navigator.onLine) {
        alert("您必须联网才能保存页面！");
        return;
    }

    // 如果当前用户已经登录，设置popup为空，执行收集事件
    if (account.token != null) {
        chrome.browserAction.setPopup({
            popup:""
        });
    }

    contentScriptDoCollect(); 
}

function contentScriptDoCollect() {
//    chrome.tabs.getSelected(null, function (tab) {
//        console.log("browser clicked：" + tab.url);
//        chrome.tabs.sendRequest(tab.id, {});
    //    });    
    chrome.tabs.executeScript(null, { code: "doCollect()" }); 
}

chrome.browserAction.onClicked.addListener(savePage);