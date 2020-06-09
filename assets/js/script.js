"use strict";

let apiToken = false;

document.addEventListener("DOMContentLoaded", init);

function init() {
  registerServiceWorker();
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



