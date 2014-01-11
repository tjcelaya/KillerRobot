
var killClick = false;
var increasingDelay = 200;
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.windows.getCurrent({populate : true}, function (Window) {
    var tabArray = Window.tabs;

    killClick = !killClick;

    if (killClick)
      chrome.browserAction.setIcon({ path: 'icon-r.png'});
    else
      chrome.browserAction.setIcon({ path: 'icon.png'});


    while(tabArray.length !== 0)
    {
        var t = tabArray.shift();
        increasingDelay += 700;

        if ( !t.pinned && !t.highlighted && !t.active )
          if (killClick)
            (function (holdURL) {
              chrome.tabs.update(t.id, { url: "chrome://kill" } );
              chrome.tabs.update(t.id, { url: holdURL } );

            }) (t.url);
          else
            (function (delay, id) {
              setTimeout(function() {
                chrome.tabs.reload(id);
                console.log("reloaded "+t.id+" after delay "+delay);
              }, delay);
            }) (increasingDelay, t.id);
    }

    increasingDelay = 200;
  });
});
