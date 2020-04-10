"use strict";

document.addEventListener("DOMContentLoaded", init);

var pointrewardchart = null;
var transactionchart = null;
var visitorschart = null;

var visitordatamonth = null;
var visitordatalmonth = null;
var visitordatayear = null;
var visitordatalyear = null;

var rewarddatamonth = null;
var rewarddatalmonth = null;
var rewarddatayear = null;
var rewarddatalyear = null;

var pointdatamonth = null;
var pointdatalmonth = null;
var pointdatayear = null;
var pointdatalyear = null;

var transactiondatamonth = null;
var transactiondatalmonth = null;
var transactiondatayear = null;
var transactiondatalyear = null;

function init() {
  eventListener();
  loadData();
}

function drawChart() {
  pointrewardchart = drawDoubleChart(
    pointdatamonth,
    green,
    "€# spend in store",
    rewarddatamonth,
    yellow,
    "#points spend on rewards",
    daysthismonth(),
    "pointrewardchart"
  );
  transactionchart = drawChart(
    transactiondatamonth,
    blue,
    "#transactions",
    daysthismonth(),
    "transactionchart"
  );
  visitorchart = drawChart(
    visitordatamonth,
    red,
    "#unique visitors",
    daysthismonth(),
    "visitorchart"
  );
}

function eventListener() {
  if (elementByIdExist("month")) {
    document.getElementById("month").onclick = function (e) {
      e.preventDefault();
      thismonth();
    };
  }
  if (elementByIdExist("lmonth")) {
    document.getElementById("lmonth").onclick = function (e) {
      e.preventDefault();
      lastmonth();
    };
  }
  if (elementByIdExist("year")) {
    document.getElementById("year").onclick = function (e) {
      e.preventDefault();
      thisyear();
    };
  }
  if (elementByIdExist("lyear")) {
    document.getElementById("lyear").onclick = function (e) {
      e.preventDefault();
      lastyear();
    };
  }
}

function thismonth() {
  updateDoubleChart(
    pointrewardchart,
    daysthismonth(),
    pointdatamonth,
    rewarddatamonth
  );
  updateChart(transactionchart, daysthismonth(), transactiondatamonth);
  updateChart(visitorchart, daysthismonth(), visitordatamonth);
}
function lastmonth() {
  updateDoubleChart(
    pointrewardchart,
    dayslastmonth(),
    pointdatalmonth,
    rewarddatalmonth
  );
  updateChart(transactionchart, dayslastmonth(), transactiondatalmonth);
  updateChart(visitorchart, dayslastmonth(), visitordatalmonth);
}
function thisyear() {
  updateDoubleChart(
    pointrewardchart,
    monthOrder(),
    pointdatayear,
    rewarddatayear
  );
  updateChart(transactionchart, monthOrder(), transactiondatayear);
  updateChart(visitorchart, monthOrder(), visitordatayear);
}
function lastyear() {
  updateDoubleChart(
    pointrewardchart,
    monthOrder(),
    pointdatalyear,
    rewarddatlyear
  );
  updateChart(transactionchart, monthOrder(), transactiondatalyear);
  updateChart(visitorchart, monthOrder(), visitordatalyear);
}

function loadData() {
  fetchDataWithToken(
    getUrl(TRANSACTIONS),
    "Bearer " + getTokenFromCookie(),
    (res) => processData(res.success)
  );
}

function processData(transactions) {
  processyear(transactions);
}

function processyear(transactions) {
  pointdatayear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  rewarddatayear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  transactiondatayear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  visitordatayear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let visitors = [[], [], [], [], [], [], [], [], [], [], [], []];

  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  let monthsum = 11 - month;

  for (let i = 0; i < transactions.length; i++) {
    let date = new Date(transactions[i].added_on);

    if (date.getFullYear() == year) {
      transactiondatayear[date.getMonth() + monthsum] += 1;

      if (transactions[i].spend_on_reward) {
        rewarddatayear[date.getMonth() + monthsum] += transactions[i].points;
      } else {
        pointdatayear[date.getMonth() + monthsum] += transactions[i].points;
      }

      if (
        !visitors[date.getMonth() + monthsum].includes(transactions[i].user.id)
      ) {
        visitors[date.getMonth() + monthsum].push(transactions[i].user.id);
      }
    } else if (date.getFullYear() == year - 1) {
      transactiondatayear[date.getMonth() + monthsum - 12] += 1;

      if (date.getMonth() > month) {
        if (transactions[i].spend_on_reward) {
          rewarddatayear[date.getMonth() + monthsum - 12] +=
            transactions[i].points;
        } else {
          pointdatayear[date.getMonth() + monthsum - 12] +=
            transactions[i].points;
        }

        if (
          !visitors[date.getMonth() + monthsum].includes(transaction[i].user.id)
        ) {
          visitors[date.getMonth() + monthsum].push(transactions[i].user.id);
        }
      }
    }
  }

  for (let i = 0; i < visitordatayear.length; i++) {
      visitordatayear[i] = visitors[i].length;
  }
}
