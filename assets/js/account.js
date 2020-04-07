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

  postFetch(LOGIN, formData, (res) => console.log(res)); //TODO SAVE AS COOKIE
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

  postFetch(REGISTER, formData, (res) => console.log(res)); //TODO SAVE AS COOKIE
}
