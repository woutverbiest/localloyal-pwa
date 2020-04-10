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
    else{
        loadData();
    }
}

function loadData(){
    console.log('start fetch');
    fetchDataWithToken(getUrl(TRANSACTIONS), "Bearer " + getTokenFromCookie(), (res) => test(res));
}

function test(res){
    
    removeLoadingScreen();
    console.log(res.success);
}