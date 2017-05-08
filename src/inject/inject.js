// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    
       var _asin = jQuery('.author').find('a').text(); 
      
      if(_asin){
            
            getAmazonProductDetails(_asin,response);
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