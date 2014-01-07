
var killClick = false;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // chrome.tabs.getSelected(null, function (T) {
  //   (T == undefined) ? console.log("noppe") : console.log(T.index);
  //   chrome.tabs.update(null, { url: "chrome://kill" } , null);
  // });
  chrome.windows.getCurrent({populate : true}, function (Window) {
    // console.log(Window)
    var tabArray = Window.tabs,
        msg = "";

        killClick = !killClick;

    while(tabArray.length !== 0)
    {
        var t = tabArray.shift();
        if ( !t.pinned && !t.highlighted && !t.active )
        {
          msg += t.index + ", ";
          if (killClick) {

            (function (holdURL) {
              chrome.tabs.update(t.id, { url: "chrome://kill" } );
              chrome.tabs.update(t.id, { url: holdURL } );

            }) (t.url);

            
          }
          else
            chrome.tabs.reload(t.id);
        }
    }
  });

  // var action_url = "javascript:window.print();";
  // chrome.tabs.update(tab.id, {url: action_url});
});
