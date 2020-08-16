"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  newShopSubmit();
}



function toshopsetup(){
  document.getElementById("getstarted").classList.add("hidden");
  document.getElementById("createshopform").classList.remove("hidden");
}

function newShopSubmit(){
  const form = document.querySelector("form.add-shop")

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("shopname", form.shopname.value);
    formData.append("shoptype", form.shoptype.value);
    formData.append("description", form.description.value);
    formData.append("phonenumber", form.phonenumber.value);
    formData.append("street", form.street.value);
    formData.append("city", form.city.value);
    formData.append("number",form.number.value);
    formData.append("country",form.country.value);
    formData.append("longitude","1")
    formData.append("longitudepos", "1")
    formData.append("latitude", "1")
    formData.append("latitudepos", "1")

    postWithToken(getUrl(SHOP_CREATE), "Bearer "+getTokenFromCookie(), formData, (data) => {redirect(index)} )
  })
}
