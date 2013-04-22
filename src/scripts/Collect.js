chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var collect = new Collect(window.location.hostname);
    
    collect.initSelector();
});

function Collect(host) {
    this.titleSelector = null;
    this.contentSelector = null;
    this.host = host;

    if (typeof Collect.prototype.initSelector !== "function") {
        Collect.prototype.initSelector = function () {
            console.log(host);
        }
    }
}