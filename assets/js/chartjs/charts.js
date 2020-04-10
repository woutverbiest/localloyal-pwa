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

function drawDashboardChart(points, rewards) {
  var ctx = document.getElementById("chart").getContext("2d");

  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: monthOrder(),
      datasets: [
        {
          label: "€# spend in store",
          data: points,
          backgroundColor: "rgba(52, 168, 83,0)",
          borderColor: "rgb(52, 168, 83)",
          borderWidth: 3,
        },
        {
          label: "#points spend on rewards",
          data: rewards,
          backgroundColor: "rgba(251, 188, 5,0)",
          borderColor: "rgb(251, 188, 5)",
          borderWidth: 3,
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
