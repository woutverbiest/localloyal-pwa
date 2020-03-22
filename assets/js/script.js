"use strict";

let apiToken = false;

document.addEventListener("DOMContentLoaded", init);

function init() {
  //registerServiceWorker();

  signup("wout","fkfjqsjf@gmail.com","12345","12345")
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function(res) {
        console.log(
          "succesfully registered service worker with scope:",
          res.scope
        );
      })
      .catch(function(err) {
        console.log("Error registering service worker:", err);
      });
  }
}



function signup(name, email, password, c_password){
            
  const formData = new FormData();
  formData.append("name",name)
  formData.append("email", email)
  formData.append("password", password)
  formData.append("c_password", c_password)

  let url = "https://localloyal.local/api/register"
 
  fetch(url , {
      method: "POST",
      body: formData

  })
  .then((response) => {
      return response.json();
  }).then(json => {
      apiToken = json.access_token
      console.log(json);
  })
}
