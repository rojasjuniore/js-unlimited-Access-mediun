chrome.tabs.onCreated.addListener(function (tab) {
  console.log('onCreated', tab)
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status != 'complete')
      return;
    if (tab.url.indexOf('https://medium.com') != -1) {
      openIncognito(tab.url)
    }
  });
})


function openIncognito(url) {
  var storedUrl = url

  chrome.windows.create({ url: storedUrl, incognito: true });
  chrome.windows.getAll({ populate: true }, function (window_list) {
    for (let w of window_list) {
      if (w.incognito) {
        chrome.cookies.getAllCookieStores(function (cs) {
          console.log(cs)
          incognitoCs = cs[1].id
          setTimeout(() => {
            chrome.cookies.remove({ storeId: incognitoCs, name: 'uid', url: storedUrl }, function (IncognitoCookies) {
              console.log("Cookie removed")
            })
          }, 3000);

        })
      }
    }
  })

}











