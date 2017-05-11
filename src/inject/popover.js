function setDOMInfo(productDetails) {

    document.getElementById('asin').textContent   = productDetails.asin;
    document.getElementById('itemName').textContent  = productDetails.itemName;
    document.getElementById('itemPrice').textContent = productDetails.itemPrice;
    document.getElementById('amazonFees').textContent = productDetails.amazonFees;
    document.getElementById('fulfillCost').textContent = productDetails.fulfillCost;
    document.getElementById('netProfit').textContent = productDetails.netProfit;

    document.getElementById('loader').style.display = "none"; 
    document.getElementById('details').style.display = "block";    
    
}


function showError(msg){
    
    document.getElementById('show-error-msg').textContent = msg;
    
    document.getElementById('loader').style.display = 'none'; 
    document.getElementById('show-error-msg').style.display = 'block';
    
}


window.addEventListener('DOMContentLoaded', function () {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {        
      
      var hostname = (new URL(tabs[0].url)).hostname;
      
      if (hostname === 'www.amazon.com'){
          
          chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'DOMInfo'}, function (response) {
              
              if (!response) {
                  showError("Something went wrong! Please reload the page!");                  
              } else if (response.error) {
                  showError(response.error);
              } else {                  
                  setDOMInfo(response.productDetails);
              }              
              
          });    
          
      } else {
          showError('Please visit www.amazon.com for using this extension.');
          
      }      
      
  });
});

