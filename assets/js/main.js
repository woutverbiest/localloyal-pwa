"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  
}

function fetchData(url, callback) {
    fetch(url)
      .then(response => response.json())
      .then(json => callback(json))
      .catch(error => console.log(error));
  }
  
  function postFetch(url, data, callback) {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(callback)
      .catch(error => console.error("Error:", error));
  }
  
  function getUser() {
    return localStorage.getItem("user");
  }