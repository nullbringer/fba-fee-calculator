function setDOMInfo(info) {
  document.getElementById('itemPrice').textContent   = info.productDetails.name;
  document.getElementById('fulCost').textContent  = info.productDetails.id;
  document.getElementById('showdata').textContent = info.productDetails.name;
    
    document.getElementById('loader').style.display = "none"; 
    document.getElementById('details').style.display = "block";
    
    
}


window.addEventListener('DOMContentLoaded', function () {

  chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {    
    
      chrome.tabs.sendMessage(tabs[0].id,{from: 'popup', subject: 'DOMInfo'}, setDOMInfo);
      
  });
});

