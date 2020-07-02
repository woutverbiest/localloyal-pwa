"use strict";

let apiToken = false;

document.addEventListener("DOMContentLoaded", init);

function init() {
  if ("serviceWorker" in navigator) {
    registerServiceWorker();
    registerNotifications();
  }
}

function registerServiceWorker() {
  navigator.serviceWorker
    .register("/sw.js")
    .then((res) => console.log("service worker registered", res))
    .catch((err) => console.log("service worker registration failed", err));
}

function registerNotifications() {
  navigator.serviceWorker.ready.then(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        registerPush();
      } else if (permission === "denied") {
        console.log("Notifications denied");
      } else if (permission === "default") {
        console.log("Notifications default");
      }
    });
  });
}

const publicVAPID = config.publicVAPID;

function registerPush(){
  let subscribeOptions = {
    userVisible:true,
    applicationServerKey: urlBase64ToUint8Array(publicVAPID)
  };

  navigator.serviceWorker.ready.then(reg => {
    return reg.pushManager.subscribe(subscribeOptions);
  }).then(sub => {
    console.log(JSON.stringify(sub));
  })
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
