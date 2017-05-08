chrome.extension.sendMessage({}, function(response) {
    
    
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
 
    if (request.getAmazonProductDetails == "true"){
        
        
        //Get ASIN value
        
        var _asin = jQuery('.author').find('a').text();       
       
                
        if(_asin){
            
            getAmazonProductDetails(_asin,sendResponse);
            return true; //to make sendResponse asynchronous
            
        }
        
    }
      
  });


function getAmazonProductDetails(_asin,callback){
        
    jQuery.ajax({
        url: "https://reqres.in/api/users",
        type: "POST",
        data: {
            name: _asin,
            movies: ["Hello World", "Role Models"]
        },
        success: function(response){
            
            callback({productDetails: response});
                   
            
        }
    });
    
}