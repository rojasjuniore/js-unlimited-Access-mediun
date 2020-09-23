
/* -----Send URL-----*/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var url = window.location.toString()
    console.log('url content', url)
    sendResponse({ url: url });
});



