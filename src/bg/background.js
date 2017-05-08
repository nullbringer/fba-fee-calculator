// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//chrome.pageAction.show(sender.tab.id);
   // sendResponse();
      
     if (request.fetchDetails == "true"){
         
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {getAmazonProductDetails: "true"}, function(response) {

                console.log(document.getElementById("showdata").value);
                
                sendResponse({productDetails: response.productDetails});
                 return true; //to make sendResponse asynchronous
            });
        });
         
        
     }
      
  });

