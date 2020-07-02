"use strict";

function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.log(error)); //TODO HANDLE ERROR
}

function post(url, data, callback) {
  return fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error)); //TODO HANDLE ERROR
}

function fetchWithToken(url, token, callback) {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error)); //TODO HANDLE ERROR
}

function postWithToken(url, token, data, callback) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((json) => callback(json))
    .catch((error) => console.error("Error:", error)); //TODO HANDLE ERROR
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

  //TODO WHEN RESETING COOKIE (LOGING OUT), ALSO REMOVE INDEXEDDB
}

function loggedIn() {
  return getTokenFromCookie() != "" ? true : false;
}

function redirect(page) {
  window.location.href = page + ".html";
}

function addLoadingScreen() {
  document.querySelector("#hidden").id = "nothidden";
}

function removeLoadingScreen() {
  document.querySelector("#nothidden").id = "hidden";
}

function getUrl(endpoint) {
  return getServerUrl() + endpoint;
}

function getServerUrl() {
  return config.server;
}

function hasShop() {
  return localforage
    .createInstance({ name: "localloyal" })
    .getItem("shop")
    .then((shop) => {
      if (shop === null) {
        fetchWithToken(
          getUrl(SHOP),
          "Bearer " + getTokenFromCookie(),
          (res, err) => shopHandler(res, err)
        );
      } else {
        removeLoadingScreen();
      }
    });
}

function shopHandler(res) {
  console.log(res);
  if (res.error != null) {
    redirect("setup");
  } else {
    localforage.createInstance({name:"localloyal"})
    .setItem("shop", res.success);
    //TODO GET TRANSACTIONS AND SET ALSO SAVE THEM IN INDEXEDDB
  }
}
