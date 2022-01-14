/* Change color */

// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }
  function getPageData(){
    var h1 = document.getElementsByTagName('h1')[0].innerText;
    console.log(h1);

    /*make api call to send data*/
    api = 'https://jsonplaceholder.typicode.com/users?' + h1;
    fetch(api)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log("success");
    });
  }

  /* Second button */

let sendDetails = document.getElementById("sendDetailsBtn");

// When the button is clicked, inject setPageBackgroundColor into current page
sendDetails.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getPageData,
    });
  });