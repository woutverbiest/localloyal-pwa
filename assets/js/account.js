"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  isLoggedIn();
  eventlisteners();
}

function eventlisteners() {
  if (elementByIdExist("login")) {
    document.getElementById("login").onclick = function (e) {
      e.preventDefault();
      login();
    };
  }
  if (elementByIdExist("signup")) {
    document.querySelector("#signup").onclick = function (e) {
      e.preventDefault();
      signup();
    };
  }
}

function login() {
  addLoadingScreen();
  let email = getFormValue("email");
  let password = getFormValue("password");

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  postFetch(LOGIN, formData, (res) => createCookie(res));
}

function signup() {
  addLoadingScreen();
  let name = getFormValue("name");
  let email = getFormValue("email");
  let password = getFormValue("password");
  let c_password = getFormValue("c_password");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("c_password", c_password);

  postFetch(REGISTER, formData, (res) => node(res, email, password));  
}

function node(res, email, password){
  var details = {
    'email':email,
    'password': password
  }

  var formBody = [];
  for (var property in details){
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch('http://localhost:8080/laravel/password',{
    method:"POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody,
  }).then((response)=>response.json())
  .then(function(){
    createCookie(res);
  })
}

function createCookie(res) {
  if (res.error == null) {
    document.cookie = "token=" + res.success.token;
    toDashboard();
  } else {
    removeLoadingScreen();

    if (typeof res.error !== "object") {
      document.querySelector(".errors").innerHTML = res.error;
    } else {
      document.querySelector(".errors").innerHTML = JSON.stringify(res.error);
    }
  }
}
