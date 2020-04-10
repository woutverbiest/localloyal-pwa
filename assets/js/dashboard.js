"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  isNotLoggedIn();
  fetchDataWithToken(
    "http://localloyal.test/api/shop",//TODO CHANGE THIS URL
    "Bearer " + getTokenFromCookie(),
    (res) => logger(res)
  );
}
function logger(res) {
  if (res.error != null) {
    toSetup();
  } else {
    loadData();
  }
}

function loadData() {
  fetchDataWithToken(
    getUrl(TRANSACTIONS),
    "Bearer " + getTokenFromCookie(),
    (res) => chartData(res)
  );
}

function chartData(res) {
  let transactions = res.success; //TODO CHECK IF SUCCESS
  let points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let rewards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  let monthsum = 11 - month;

  for (let i = 0; i < transactions.length; i++) {
    let date = new Date(res.success[i].added_on);

    if (date.getFullYear() == year) {
      if (transactions[i].spend_on_reward) {
        rewards[date.getMonth() + monthsum] += transactions[i].points;
      } else {
        points[date.getMonth() + monthsum] += transactions[i].points;
      }
    } else if (date.getFullYear() == year - 1) {
      if (date.getMonth() > month) {
        if (transactions[i].spend_on_reward) {
          rewards[date.getMonth() + monthsum - 12] += transactions[i].points;
        } else {
          points[date.getMonth() + monthsum - 12] += transactions[i].points;
        }
      }
    }
  }
  drawDashboardChart(points, rewards);
  removeLoadingScreen();
}
