function doCollect() {
    var collect = new Collect(window.location.hostname);

    collect.send();
}

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    doCollect();
});