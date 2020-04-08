"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    isNotLoggedIn();
    fetchDataWithToken("http://localloyal.test/api/shop","Bearer " + getTokenFromCookie(), (res) => logger(res));
}
function logger(res){
    if (res.error != null){
        toSetup();
    }
}



