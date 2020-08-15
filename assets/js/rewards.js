"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  !loggedIn() ? redirect("login") : null;
  loadData();
}

async function loadData() {
  let url = getUrl(SHOP);
  let id = (await getShop()).id;
  fetchData(`${url}/${id}/rewards`, (data) => addData(data));
  newRewardSubmit();
  
}

function addData(data) {
  let main = document.querySelector("main");

  try {
    for (let i = 0; i < data.success.length; i++) {
        main.innerHTML += `
        <div class="card">
        <div clas="card-content">
        <span class="card-title">${data.success[i].reward_name}</span>
        <p>${data.success[i].description}</p>
        <p>${data.success[i].points} poins</p
        </div>
        </div>
        `;
    }
  } catch (e) {
    main.append(`<p>Something went wrong</p>`);
  }
}

function newRewardSubmit(){
    const form = document.querySelector("form.add-reward");

    form.addEventListener("submit", (event) => {
        event.preventDefault();        

        const formData = new FormData();
        formData.append("reward_name", form.reward_title.value);
        formData.append("points", form.points.value);
        formData.append("description", form.description.value);
    
        postWithToken(getUrl(REWARD), "Bearer "+getTokenFromCookie() , formData ,(data) => {console.log(data)})
    });
}
