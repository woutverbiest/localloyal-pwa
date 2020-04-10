var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var green = "rgb(23,156,82)";
var blue = "rgb(23,107,239)";
var red = "rgb(255,62,48)";
var yellow = "rgb(247,181,41)";

function drawDoubleChart(data1, color1, label1, data2, color2, label2, labels, id) {
  Chart.defaults.global.defaultFontFamily = 'baloo';
  Chart.defaults.global.defaultFontSize = 14;
  var ctx = document.getElementById(id).getContext("2d");

  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: label1,
          data: data1,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: color1,
          borderWidth: 2,
        },
        {
          label: label2,
          data: data2,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: color2,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  return chart;
}

function updateDoubleChart(chart, labels, data1, data2){
  chart.data.labels = labels;
  chart.data.datasets[0].data = data1;
  chart.data.datasets[1].data = data2;
  chart.update();
}

function drawChart(data, color, label, labels, id){
  Chart.defaults.global.defaultFontFamily = 'baloo';
  Chart.defaults.global.defaultFontSize = 14;
  var ctx = document.getElementById(id).getContext("2d");

  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: color,
          borderWidth: 2,
        }
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  return chart;
}

function updateChart(chart, labels, data){
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

function monthOrder() {
  let currentmonth = new Date().getMonth();
  let order = [];

  for (let i = 0; i < months.length; i++) {
    let j = currentmonth + i + 1;
    if (j >= 12) {
      order.push(months[j - 12]);
    } else {
      order.push(months[j]);
    }
  }
  return order;
}

function daysthismonth(){
  let order = [];
  let currentdate = new Date();
  ndays = getDaysInMonth((currentdate.getMonth())+1, currentdate.getYear());
  console.log(ndays)
  for(let i = 0; i < ndays; i++){
    order.push(i+1);
  }
}

function dayslastmonth(){
  let order = [];
  let currentdate = new Date();
  ndays = getDaysInMonth((currentdate.getMonth()), currentdate.getYear());
  console.log(ndays)
  for(let i = 0; i < ndays; i++){
    order.push(i+1);
  }
}

function getDaysInMonth(month, year){
  return new Date(year, month, 0).getDate();
}
