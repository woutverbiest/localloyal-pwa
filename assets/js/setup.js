"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  eventListeners();
}

function eventListeners(){
    document.querySelector("a#progress1").onclick = function (e) {
        e.preventDefault();
        document.querySelector("div#getstarted").classList.add('hidden');
        document.querySelector("div#shop").classList.remove('hidden');
        document.querySelector("div#setup").classList.remove('hidden');
      };
}
