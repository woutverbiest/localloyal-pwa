"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  eventListeners();
}

function eventListeners() {
  document.querySelector("a#progress1").onclick = function (e) {
    e.preventDefault();
    document.querySelector("div#getstarted").classList.add("hidden");
    document.querySelector("div#shop").classList.remove("hidden");
    document.querySelector("div#setup").classList.remove("hidden");
  };
  document.querySelector("a#progress2").onclick = function (e) {
    e.preventDefault();
    document.querySelector("div#shop").classList.add("hidden");
    document.querySelector("div#openinghours").classList.remove("hidden");
  };
  document.querySelector("a#progress3").onclick = function (e) {
    e.preventDefault();
    document.querySelector("div#openinghours").classList.add("hidden");
    document.querySelector("div#rewards").classList.remove("hidden");
  };
  document.querySelector("a#progress4").onclick = function (e) {
    e.preventDefault();
    document.querySelector("div#rewards").classList.add("hidden");
    document.querySelector("div#pincode").classList.remove("hidden");
  };
  document.querySelector("a#progress5").onclick = function (e) {
    e.preventDefault();
    document.querySelector("div#pincode").classList.add("hidden");
    document.querySelector("div#setup").classList.add("hidden");
    document.querySelector("div#successful").classList.remove("hidden");
  };
}

function saveShop(){

}
function saveOpeninghours(){

}
function saveRewards(){

}
function savePincode(){
    
}
