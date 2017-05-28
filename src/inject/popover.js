function setDOMInfo(productDetails) {
    
    if(!productDetails.itemName || !productDetails.asin || !productDetails.itemPrice || !productDetails.amazonFees || !productDetails.fulfillCost){
        
        showError(chrome.i18n.getMessage("dataExceptionMsg")); 
        console.log(productDetails);
        return;
        
    }
    
    var productItemPrice = productDetails.saleprice? productDetails.saleprice : productDetails.itemPrice;
    
    document.getElementById('itemName').textContent  = productDetails.itemName;
    document.getElementById('asin').textContent  = productDetails.asin;    
    document.getElementById('itemPrice').textContent = productItemPrice;    
    document.getElementById('prodDimensions').textContent = productDetails.itemdimension.Length + " X "+
                                                            productDetails.itemdimension.Width + " X "+
                                                            productDetails.itemdimension.Height;    
    document.getElementById('unitWeight').textContent = productDetails.itemweight;   
    document.getElementById('amazonFees').textContent = productDetails.amazonFees;
    document.getElementById('fulfillCost').textContent = productDetails.fulfillCost;
    document.getElementById('revenue').textContent = (productItemPrice - productDetails.amazonFees - productDetails.fulfillCost).toFixed(2);
    
    calculateWithProductCost(0.00);
    
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
                  showError(chrome.i18n.getMessage("generalExceptionMsg"));                  
              } else if (response.error) {
                  showError(response.error);
              } else {                  
                  setDOMInfo(response.productDetails);
              }  
          });    

      } else {         
          
          showError(chrome.i18n.getMessage("navigateToHomeSite"));          
      }      

    });
    
    
    
    
    document.getElementById("productCostInput").addEventListener("keyup", function(){

        var productCost = Number(document.getElementById("productCostInput").value);

        if(!Number.isNaN(productCost)){        
            calculateWithProductCost(productCost);
        } else {       
            document.getElementById("productCostInput").value = 0.00;
            calculateWithProductCost(0);
        }

    });   
        
});




function calculateWithProductCost(productCost){
    
    
    var itemPrice = Number(document.getElementById("itemPrice").textContent);
    var revenue = Number(document.getElementById("revenue").textContent); 
    var newNetProfit = (revenue - productCost).toFixed(2);
    var newNetMargin = (newNetProfit/itemPrice*100).toFixed(2);
    
    var netProfitElement = document.getElementById("netProfit");
    var netMarginElement = document.getElementById("netMargin");
    
    netProfitElement.textContent = newNetProfit;    
    netMarginElement.textContent = newNetMargin;
    
    if(newNetProfit<0){        
        classToElement(document.getElementById("net-section"),"loss","profit");  
        
    } else {
        classToElement(document.getElementById("net-section"),"profit","loss");
    }    

}


function classToElement(el,toBeAdded,toBeRemoved){
    
    el.classList.add(toBeAdded);
    el.classList.remove(toBeRemoved);
    
}

