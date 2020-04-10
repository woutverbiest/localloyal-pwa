"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  isNotLoggedIn();
  eventListeners();
}

function eventListeners() {
  document.querySelector("a#progress1").onclick = function (e) {
    e.preventDefault();
    document.querySelector("div#getstarted").classList.add("hidden");
    loadshopTypes();
  };
  document.querySelector("a#progress2").onclick = function (e) {
    e.preventDefault();
    document.querySelector("div#shop").classList.add("hidden");
    document.querySelector("div#openinghours").classList.remove("hidden");
    saveShop();
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

function saveShop() {
    addLoadingScreen();
    let shopname = getFormValue("shopname");
    let shoptype = getFormValue("shoptype");
    let phone = getFormValue("phone");
    let street = getFormValue("street");
    let city = getFormValue("city");
    let number = getFormValue("number");
    let zip = getFormValue("zip");
    let description = getFormValue("description")
    
    const formData = new FormData();
    formData.append("shopname", shopname);
    formData.append("shoptype", shoptype);
    formData.append("phone", phone);
    formData.append("street",street);
    formData.append("city", city);
    formData.append("number", number);
    formData.append("zip", zip);
    formData.append("description", description);

    postDataWithToken(getUrl(SHOP_CREATE), "Bearer " + getTokenFromCookie(),formData, (res) => console.log(res));

}

function saveOpeninghours() {}
function saveRewards() {}
function savePincode() {}

function loadshopTypes(){
  addLoadingScreen();
  
  fetchData(getUrl(SHOP_TYPES), (res) => insertShopTypes(res.success));
}

function insertShopTypes(res){
  for(let i=0; i<res.length; i++){
    let option = document.createElement("option");
    option.innerHTML = res[i].type;
    option.setAttribute("value", res[i].id);
    document.querySelector("#shoptype").append(option);
  }
  removeLoadingScreen();
  document.querySelector("div#shop").classList.remove("hidden");
  document.querySelector("div#setup").classList.remove("hidden");
}