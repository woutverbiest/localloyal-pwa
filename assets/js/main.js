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
    body: data
  })
    .then((response)=>response.json())
    .then((json)=>callback(json))
    .catch((error) => console.error("Error:", error));
}

function getUrl(endpoint){
  return "http://localloyal.test" + endpoint;
}

function getFormValue(id){
  return document.getElementById(id).value;
}

function elementByIdExist(id){
  return document.getElementById(id) !== null;
}
