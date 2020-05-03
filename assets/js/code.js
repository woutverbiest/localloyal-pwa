"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    eventListeners();
}

function eventListeners() {
  if (elementByIdExist("generate")) {
    document.getElementById("generate").onclick = function (e) {
      e.preventDefault();
      generate();
    };
  }
}
function generate() {
  let points = getFormValue("points");

  const formData = new FormData();
  formData.append("points", points);

  postDataWithToken(
    "http://localloyal.test/api/code", //TODO NOT HARDCODE THIS
    "Bearer " + getTokenFromCookie(),
    formData,
    (res) => logger(res)
  );
}

function logger(res) {
  console.log(res);
  new QRCode(document.getElementById("qrcode"), res.success.code);
}
