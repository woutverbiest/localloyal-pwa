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
  return fetch(getUrl(endpoint), {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error));
}

function fetchDataWithToken(url ,token, callback){
  return fetch(url, {
    method: "GET",
    headers: {
      'Authorization' : token,
      'Accept' : 'application/json',
    },
  }).then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error));
}

function getUrl(endpoint) {
  return "http://localloyal.test" + endpoint;
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

function isLoggedIn(){
  if (getTokenFromCookie() != "") {
    window.location.href = "index.html";
  }
}

function hasShop(){
  fetchDataWithToken(SHOP, res => console.log(res));
}

function toDashboard() {
  window.location.href = "index.html";
}

function toSetup(){
  window.location.href = "setup.html";
}
