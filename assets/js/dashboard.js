"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  !loggedIn() ? redirect("login") : null;
  hasShop();
  loadData();
}

function loadData() {
  try{
  fetchWithToken(
    getUrl(TRANSACTIONS),
    "Bearer " + getTokenFromCookie(),
    (res) => chartData(res)
  );} catch (e) {redirect("setup")}
}

function chartData(res) {
  let transactions = res.success;
  let points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let rewards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  let monthsum = 11 - month;

  for (let i = 0; i < transactions.length; i++) {
    let date = new Date(transactions[i].added_on);

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
  drawDoubleChart(
    points,
    green,
    "#€ spend in store",
    rewards,
    yellow,
    "#points spend on rewards",
    monthOrder(),
    "rewardpointschart"
  );
}
