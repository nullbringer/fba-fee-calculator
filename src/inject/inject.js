// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
      
      var asin = jQuery('#ASIN').val(); 
      
      if (asin) {
          
            getAmazonProductDetails(asin,response);
            return true; //to make sendResponse asynchronous
            
        } else {
            
            response({error : chrome.i18n.getMessage("navigateToProductPage")});
        }
      
  }
});


function getAmazonProductDetails(asin,callback){
    
    var payload = JSON.stringify({"asin": asin});
    
    jQuery.ajax({
        url: "xxx.com/api/",
        type: "POST",
        data: payload,
        success: function (response) { 
            
                        
            try {
                var res = JSON.parse(response);            
                
                if(res.data.success === 'true'){

                    callback({productDetails: res.data});   

                } else {

                    callback({error : res.data.error})
                }
                
            } catch (e) {
                
                response({error : chrome.i18n.getMessage("generalExceptionMsg")});
            }
                        
                               
            
        },
        error: function (response){
            response({error : chrome.i18n.getMessage("generalExceptionMsg")});     
        }
    });
    
}