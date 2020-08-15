


  "use strict";

  document.addEventListener("DOMContentLoaded", init);
  
  function init() {
        document.getElementById("logOut").onclick = function (e) {
          e.preventDefault();
          resetCookie();
          !loggedIn() ? redirect("login") : null;
        };
  }