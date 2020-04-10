


  "use strict";

  document.addEventListener("DOMContentLoaded", init);
  
  function init() {
    if (elementByIdExist("logOut")) {
        document.getElementById("logOut").onclick = function (e) {
          e.preventDefault();
          resetCookie();
          isNotLoggedIn();
        };
      }
  }