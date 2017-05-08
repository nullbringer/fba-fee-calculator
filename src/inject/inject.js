// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
      
       var _asin = jQuery('#ASIN').val(); 
      
      if(_asin){
          
            getAmazonProductDetails(_asin,response);
            return true; //to make sendResponse asynchronous
            
        }else {
            
            response({error:"Please navigate to product page to use this extension."})
        }
      
  }
});


function getAmazonProductDetails(_asin,callback){
        
    jQuery.ajax({
        url: "https://www.fbastores.com/dkfd983mgflsd9.php",
        type: "POST",
        data: {
            name: _asin
        },
        success: function(response){
            
            
            callback({productDetails: JSON.parse(response)});
                   
            
        }
    });
    
}