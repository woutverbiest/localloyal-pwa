"use strict";

document.addEventListener("DOMContentLoaded", init);

var pointrewardchart = null;

var rewarddatamonth = null;
var rewarddatalmonth = null;
var rewarddatayear = null;
var rewarddatalyear = null;

var pointdatamonth = null;
var pointdatalmonth = null;
var pointdatayear = null;
var pointdatalyear = null;

function init() {
  addLoadingScreen();
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

  removeLoadingScreen();
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
}
function lastmonth() {
  updateDoubleChart(
    pointrewardchart,
    dayslastmonth(),
    pointdatalmonth,
    rewarddatalmonth
  );
}
function thisyear() {
  updateDoubleChart(
    pointrewardchart,
    monthOrder(),
    pointdatayear,
    rewarddatayear
  );
}
function lastyear() {
  updateDoubleChart(
    pointrewardchart,
    monthOrder(),
    pointdatalyear,
    rewarddatalyear
  );
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
  processlastyear(transactions);
  processmonth(transactions);
  drawChart();
}

function processyear(transactions) {
  pointdatayear = generatelist(12, 0);
  rewarddatayear = generatelist(12, 0);

  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  let monthsum = 11 - month;

  for (let i = 0; i < transactions.length; i++) {
    let date = new Date(transactions[i].added_on);
    if (date.getFullYear() == year) {if (transactions[i].spend_on_reward) {
        rewarddatayear[date.getMonth() + monthsum] += transactions[i].points;
      } else {
        pointdatayear[date.getMonth() + monthsum] += transactions[i].points;
      }
    } else if (date.getFullYear() == year - 1) {if (date.getMonth() > month) {
        if (transactions[i].spend_on_reward) {
          rewarddatayear[date.getMonth() + monthsum - 12] +=
            transactions[i].points;
        } else {
          pointdatayear[date.getMonth() + monthsum - 12] +=
            transactions[i].points;
        }
      }
    }
  }
}

function processlastyear(transactions) {
  pointdatalyear = generatelist(12, 0);
  rewarddatalyear = generatelist(12, 0);

  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  let monthsum = 11 - month;

  for (let i = 0; i < transactions.length; i++) {
    let date = new Date(transactions[i].added_on);

    if (date.getFullYear() == year - 1) {
      if (transactions[i].spend_on_reward) {
        rewarddatalyear[date.getMonth() + monthsum] += transactions[i].points;
      } else {
        pointdatalyear[date.getMonth() + monthsum] += transactions[i].points;
      }
    } else if (date.getFullYear() == year - 2) {if (date.getMonth() > month) {
        if (transactions[i].spend_on_reward) {
          rewarddatalyear[date.getMonth() + monthsum - 12] +=
            transactions[i].points;
        } else {
          pointdatalyear[date.getMonth() + monthsum - 12] +=
            transactions[i].points;
        }
      }
    }
  }
}

function processmonth(transactions) {
  pointdatamonth = generatelist(dayslastmonth().length, 0);
  rewarddatamonth = generatelist(dayslastmonth().length, 0);
  pointdatalmonth = generatelist(dayslastmonth().length, 0);
  rewarddatalmonth = generatelist(dayslastmonth().length, 0);

  var currentdate = new Date();

  for (let i = 0; i < transactions.length; i++) {
    let date = new Date(transactions[i].added_on);
    console.log(date.getDate());
    if (currentdate.getMonth() == date.getMonth() && currentdate.getFullYear() == date.getFullYear()) {
      if (transactions[i].spend_on_reward) {
        rewarddatamonth[date.getDate()-1] += transactions[i].points;
      } else {
        pointdatamonth[date.getDate()-1] += transactions[i].points;
      }
    }

    else if(currentdate.getMonth() - 1 == date.getMonth() && currentdate.getFullYear() == date.getFullYear()){
      if (transactions[i].spend_on_reward) {
        rewarddatalmonth[date.getDate()-1] += transactions[i].points;
      } else {
        pointdatalmonth[date.getDate()-1] += transactions[i].points;
      }
    }
    else if(currentdate.getMonth + 11 == date.getMonth() && currentdate.getFullYear() -1 == date.getFullYear()){
      if (transactions[i].spend_on_reward) {
        rewarddatalmonth[date.getDate()-1] += transactions[i].points;
      } else {
        pointdatalmonth[date.getDate()-1] += transactions[i].points;
      }
    }
  }
}



function generatelist(n, value) {
  let list = [];
  for (let i = 0; i < n; i++) {
    list.push(value);
  }
  return list;
}
