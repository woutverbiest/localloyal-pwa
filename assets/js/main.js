"use strict";



document.addEventListener("DOMContentLoaded", init);

function init() {}

function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.log(error));
}

function postFetch(endpoint, data, callback) {
  let url = getUrl(endpoint);
  return fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error));
}

function fetchDataWithToken(url, token, callback) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Authorization": token,
      "Accept": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error));
}

function postDataWithToken(url, token, data, callback) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Authorization": token,
      "Accept": "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error));
}



function getFormValue(id) {
  return document.getElementById(id).value;
}

function elementByIdExist(id) {
  return document.getElementById(id) !== null;
}

function getTokenFromCookie() {
  var cookieValue = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return cookieValue;
}

function resetCookie() {
  document.cookie = "token=";
}

function isNotLoggedIn() {
  if (getTokenFromCookie() == "") {
    window.location.href = "login.html";
  }
}

function isLoggedIn() {
  if (getTokenFromCookie() != "") {
    window.location.href = "index.html";
  }
}

//TODO USE THIS FUNCTION AND FIX IT
function hasShop() {
  fetchDataWithToken(SHOP, (res) => console.log(res));
}

function toDashboard() {
  window.location.href = "index.html";
}

function toSetup() {
  window.location.href = "setup.html";
}

function addLoadingScreen() {
  document.querySelector("#hidden").id = "nothidden";
}

function removeLoadingScreen() {
  document.querySelector("#nothidden").id = "hidden";
}


function getUrl(endpoint) {
  console.log(endpoint)
  return getLaravelUrl() + endpoint;
}

function getNodeUrl(){
  return config.node;
}

function getLaravelUrl(){
  return config.laravel;
}