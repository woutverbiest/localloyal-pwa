"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
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
  let email = getFormValue("email");
  let password = getFormValue("password");

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  postFetch(LOGIN, formData, (res) => createCookie(res));
}

function signup() {
  let name = getFormValue("name");
  let email = getFormValue("email");
  let password = getFormValue("password");
  let c_password = getFormValue("c_password");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("c_password", c_password);

  postFetch(REGISTER, formData, (res) => createCookie(res));
}

function createCookie(res) {
  if(res.error == null){
    document.cookie = "token=" + res.success.token;
    toDashboard();
  }
  else{
    console.log(res.error);//TODO add errors to screen
  }
}
