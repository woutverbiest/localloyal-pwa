"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    newCodeSubmit();
}

function newCodeSubmit(){
  const form = document.querySelector("form.add-code")

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("points", form.points.value);

    postWithToken(getUrl(CODE), "Bearer " + getTokenFromCookie(), formData, (data) => {generate(data.success.code)});
  })
}

function generate(code) {
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), code);
}

