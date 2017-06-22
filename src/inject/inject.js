// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
      
      var asin = "";
      
      var isAmazon = true;
      
      if(window.location.hostname === 'fmafront.sellwithamazon.com'){
          isAmazon = false;
      }
      
      if(!isAmazon){
          
          asin = jQuery.trim(jQuery('#ASIN').text()); 
          
      } else {
          
           asin = jQuery('#ASIN').val(); 
          
      }
      
      
      if (asin) {
          
            getAmazonProductDetails(isAmazon,asin,response);
            return true; //to make sendResponse asynchronous
            
        } else {
            
            if(!isAmazon){
                
                response({error : chrome.i18n.getMessage("asinNotProvided")});
                
            } else {
                
                //asin not found for amazon: means, not in product page
                response({error : chrome.i18n.getMessage("navigateToProductPage")});
            }
                        
        }
      
  }
});


function getAmazonProductDetails(isAmazon,asin,callback){
    
    var payload = JSON.stringify({"asin": asin});
    
    jQuery.ajax({
        url: "xxx.com/price-checker-api/",
        type: "POST",
        data: payload,
        success: function (response) { 
            
                        
            try {
                var res = JSON.parse(response);            
                
                if(res.data.success === 'true'){
                    
                     
                    
                    if(!isAmazon){                        
                        
                        var summaryArea = jQuery('.summary');
                        
                        
                        var prodCost = summaryArea.find('#Sale_Price').length>0? summaryArea.find('#Sale_Price').html() : summaryArea.find('#Retail_Price').html();       
                    
                        res.data.productCost = jQuery.trim(prodCost);
                        
                    } else {
                        res.data.productCost = "0.00";                        
                    }
                    

                    callback({productDetails: res.data});   

                } else {

                    callback({error : res.data.error})
                }
                
            } catch (e) {
                
                callback({error : chrome.i18n.getMessage("generalExceptionMsg")});
            }
                        
                               
            
        },
        error: function (response){
            callback({error : chrome.i18n.getMessage("generalExceptionMsg")});     
        }
    });
    
}