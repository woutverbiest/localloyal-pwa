"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  (loggedIn()) ? redirect("index") : null;
  eventlisteners();
}

function eventlisteners() {
  const form = document.querySelector("form");

  if (document.getElementById("login")) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let email = form.email.value;
      let password = form.password.value;

      login(email, password);
    });
  }
  if (document.getElementById("signup")) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let name = form.name.value;
      let email = form.email.value;
      let password = form.password.value;
      let c_password = form.c_password.value;

      signup(name, email, password, c_password);
    });
  }
}

function login(email, password) {
  addLoadingScreen();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  post(getUrl(LOGIN), formData, (res) => createCookie(res));
}

function signup(name, email, password, c_password) {
  addLoadingScreen();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("c_password", c_password);

  post(getUrl(REGISTER), formData, (res, err) => createCookie(res, err));
}

function createCookie(res) {
  if (res.error == null) {
    document.cookie = "token=" + res.success.token;
    redirect("index");//TODO CHANGE THIS!
  } else {
    removeLoadingScreen();

    if (typeof res.error !== "object") {
      document.querySelector(".errors").innerHTML = res.error;
    } else {
      document.querySelector(".errors").innerHTML = JSON.stringify(res.error);
    }
  }
}
