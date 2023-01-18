var datasuhu = { labels: [], series: [[0]] };
var datakelembaban = { labels: [], series: [[0]] };
var datajumlah = { labels: [], series: [[0]] };
var datacahaya = { labels: [], series: [[0]] };
var datakebisingan = { labels: [], series: [[0]] };

var dataroom = [];

window.myFunction = function (event) {
  const current = document.getElementsByClassName(" active");
  current[0].className = current[0].className.replace(" active", "");
  event.className += " active";
};

$(document).ready(function () {
  bardonut();

  $("#myTableTop").DataTable({
    pageLength: 5,
    //max 5 row

    lengthChange: false,
    search: false,
    //previous and next button false
    paging: false,
    searching: false,
  });

  $("#myTable").DataTable({
    pageLength: 5,
    lengthChange: false,
    search: true,
  });

  // get Delete Product
  $(".btn-delete").on("click", function () {
    // get data from button delete
    const username = $(this).data("username");
    // Set data to Form Edit
    $(".username").val(username);
    // Call Modal Edit
    $("#deleteModal").modal("show");
  });

  // get Edit Product
  $(".btn-edit").on("click", function () {
    // get data from button edit
    const id = $(this).data("id");
    const username = $(this).data("username");
    const password = $(this).data("password");
    const email = $(this).data("email");
    const role = $(this).data("role");
    const nohp = $(this).data("nohp");
    // Set data to Form Edit
    $(".username").val(username);
    $(".password").val(password);
    $(".email").val(email);
    $(".role").val(role);
    $(".nohp").val(nohp);
    $(".id").val(id);

    // Call Modal Edit
    $("#editAkun").modal("show");
  });
});

window.onload = function () {
  top5home();
  requestData();
};

function progress(id) {
  var progress = document.getElementById("progress" + id + "Suhu");
  var progress2 = document.getElementById("progress" + id + "Kelembaban");
  var progress3 = document.getElementById("progress" + id + "Pencahayaan");
  var progress4 = document.getElementById("progress" + id + "Kebisingan");
  var progress5 = document.getElementById("progress" + id + "Jumlah Orang");
  let Kebisingan = document.getElementsByClassName("Kebisingan");
  let kelembaban = document.getElementsByClassName("Kelembaban");
  let suhu = document.getElementsByClassName("Suhu");
  let pencahayaan = document.getElementsByClassName("Pencahayaan");
  let jumlah = document.getElementsByClassName("Jumlah");
  var widths = 1;
  var widthk = 1;
  var widthp = 1;
  var widthb = 1;
  var widthj = 1;
  var id = setInterval(framesuhu, 10);
  //random number between 1 and 100
  var random = Math.floor(Math.random() * 100) + 1;
  //change the width of the progress bar
  var id2 = setInterval(framekelembaban, 10);
  //random number between 1 and 100
  var random2 = Math.floor(Math.random() * 100) + 1;
  //change the width of the progress bar
  var id3 = setInterval(framepencahayaan, 10);
  //random number between 1 and 100
  var random3 = Math.floor(Math.random() * 100) + 1;
  //change the width of the progress bar
  var id4 = setInterval(framekebisingan, 10);
  //random number between 1 and 100
  var random4 = Math.floor(Math.random() * 100) + 1;
  //change the width of the progress bar
  var id5 = setInterval(framejumlah, 10);
  //random number between 1 and 100
  var random5 = Math.floor(Math.random() * 100) + 1;

  function framesuhu() {
    if (progress != null) {
      if (widths >= random) {
        clearInterval(id);
      } else {
        widths++;
        progress.style.width = widths * 1 + "%";
        // suhu[0].innerHTML = widths * 1 + "%";
        //if the progress bar is full, change the color to green
        if (widths >= 80) {
          //change clas danger remove
          progress.classList.add("bg-danger");
          progress.classList.remove("bg-warning");
          progress.classList.remove("bg-success");
        } else if (widths >= 50 && widths < 80) {
          progress.classList.add("bg-warning");
          progress.classList.remove("bg-success");
          progress.classList.remove("bg-danger");
        } else if (widths < 50) {
          progress.classList.add("bg-success");
          progress.classList.remove("bg-warning");
          progress.classList.remove("bg-danger");
        }
      }
    }
  }

  function framekelembaban() {
    if (progress2 != null) {
      if (widthk >= random2) {
        clearInterval(id2);
      } else {
        widthk++;
        progress2.style.width = widthk * 1 + "%";
        // kelembaban[0].innerHTML = widthk * 1 + "%";
        //if the progress bar is full, change the color to green
        if (widthk >= 80) {
          //change clas danger remove succes
          progress2.classList.add("bg-danger");
          progress2.classList.remove("bg-warning");
          progress2.classList.remove("bg-success");
        } else if (widthk >= 50 && widthk < 80) {
          progress2.classList.add("bg-warning");

          progress2.classList.remove("bg-success");
          progress2.classList.remove("bg-danger");
        } else if (widthk < 50) {
          progress2.classList.add("bg-success");
          progress2.classList.remove("bg-warning");
          progress2.classList.remove("bg-danger");
        }
      }
    }
  }

  function framepencahayaan() {
    if (progress3 != null) {
      if (widthp >= random3) {
        clearInterval(id3);
      } else {
        widthp++;
        progress3.style.width = widthp * 1 + "%";
        // pencahayaan[0].innerHTML = widthp * 1 + "%";
        //if the progress bar is full, change the color to green
        if (widthp >= 80 && widthp < 100) {
          //change clas danger remove
          progress3.classList.add("bg-danger");

          progress3.classList.remove("bg-warning");
          progress3.classList.remove("bg-success");
        } else if (widthp >= 50 && widthp < 80) {
          progress3.classList.add("bg-warning");

          progress3.classList.remove("bg-success");
          progress3.classList.remove("bg-danger");
        } else if (widthp < 50) {
          progress3.classList.add("bg-success");

          progress3.classList.remove("bg-warning");
          progress3.classList.remove("bg-danger");
        }
      }
    }
  }

  function framekebisingan() {
    if (progress4 != null) {
      if (widthb >= random4) {
        clearInterval(id4);
      } else {
        widthb++;
        progress4.style.width = widthb * 1 + "%";
        // Kebisingan[0].innerHTML = widthb * 1 + "%";
        //if the progress bar is full, change the color to green
        if (widthb >= 80) {
          //change clas danger remove succes
          progress4.classList.add("bg-danger");

          progress4.classList.remove("bg-warning");
          progress4.classList.remove("bg-success");
        } else if (widthb >= 50 && widthb < 80) {
          progress4.classList.add("bg-warning");

          progress4.classList.remove("bg-success");
          progress4.classList.remove("bg-danger");
        } else if (widthb < 50) {
          progress4.classList.add("bg-success");

          progress4.classList.remove("bg-warning");
          progress4.classList.remove("bg-danger");
        }
      }
    }
  }

  function framejumlah() {
    if (progress5 != null) {
      if (widthj >= random5) {
        clearInterval(id5);
      } else {
        widthj++;
        progress5.style.width = widthj * 1 + "%";
        // Jumlah[0].innerHTML = widthj * 1 + "%";
        //if the progress bar is full, change the color to green
        if (widthj >= 80) {
          //change clas danger remove succes
          progress5.classList.add("bg-danger");

          progress5.classList.remove("bg-warning");
          progress5.classList.remove("bg-success");
        } else if (widthj >= 50 && widthj < 80) {
          progress5.classList.add("bg-warning");

          progress5.classList.remove("bg-success");
          progress5.classList.remove("bg-danger");
        } else if (widthj < 50) {
          progress5.classList.add("bg-success");

          progress5.classList.remove("bg-warning");
          progress5.classList.remove("bg-danger");
        }
      }
    }
  }
}

i = 1;

function resetgrapik() {
  i = 1;
  //clear datasuhu
  datasuhu = { labels: [], series: [[0]] };
  //clear datakelembaban
  datakelembaban = { labels: [], series: [[0]] };
  //clear datapencahayaan
  datacahaya = { labels: [], series: [[0]] };
  //clear datakebisingan
  datakebisingan = { labels: [], series: [[0]] };
  //clear datajumlah
  datajumlah = { labels: [], series: [[0]] };
}

function requestData() {
  // Ajax call to get the Data from Flask
  //random number 0.1 to 1

  var random = Math.random() * 1 + 0.1;

  var requests = $.get("/data");

  var requests2 = $.get("/data2");

  var tem = requests2.done(function (result) {
    // send consol log to check if the data
    //append array to html
    for (i = 0; i < result.length; i++) {
      if (dataroom.length == result.length) {
        dataroom.shift();
      }
      // console.log("ini data 1 " + result[i]);
      dataroom.push({ name: result[i][0], id: result[i][1], data: [] }); // console.log(dataroom[i].data);
    }

    // console.log("ini data 2 " + result[0]);
  });

  var tm = requests.done(function (result) {
    // send consol log to check if the data is coming
    //if route  in /Ruangan
    if (window.location.pathname == "/Ruangan") {
      // change the value of the progress bar
      for (i = 0; i < dataroom.length; i++) {
        progress(dataroom[i].id);
      }
    }
    // console.log(window.location.pathname);
    patname = window.location.pathname;
    //patname dikurangin 3 karakter
    patname = patname.substring(0, patname.length - 2);
    // console.log(patname);

    for (i = 0; i < dataroom.length; i++) {
      var random = Math.random() * 100;
      if (dataroom[i].data.length == 1) {
        dataroom[i].data.shift();
      }
      //if data has 5 data delete first data
      dataroom[i].data.push(random.toFixed(0));
    }

    //if route in /Ruangan/id
    if (patname === "/Ruangan/") {
      //random number 1-100

      //push data to array
      //if data has 5 data delete first data

      //push data to array

      top5room();
    }
    //append the data to array data
    //[{ data: [{ x: , y:  }] }]
    // data.x.push(result[0]);
    // data.y.push(result[1]);
    // parse = result[1];
    // data.series[0].data.push({ x: result[0], y: parse.toFixed(0) });

    datasuhu.labels.push(result[i][1]);
    datacahaya.labels.push(result[i][1]);
    datakebisingan.labels.push(result[i][1]);
    datajumlah.labels.push(result[i][1]);
    datakelembaban.labels.push(result[i][1]);
    //convert to decimal
    parse = result[i][0];

    datasuhu.series[0].push(parse.slice(0, 5));
    datacahaya.series[0].push(parse.slice(0, 5));
    datakebisingan.series[0].push(parse.slice(0, 5));
    datajumlah.series[0].push(parse.slice(0, 2));
    datakelembaban.series[0].push(parse.slice(0, 5));

    // call it again after one second
    i++;
    setTimeout(requestData, 2000);
  });

  //if route in

  if (window.location.pathname == "/Ruangan") {
    colorborder();
  }
  top5home();
  colorbadge();
  updateChart();
}

function bardonut() {
  var random1 = Math.random() * 1 + 0.1;
  var random2 = Math.random() * 1 + 0.1;
  var random3 = Math.random() * 1 + 0.1;
  var random4 = Math.random() * 1 + 0.1;
  var random5 = Math.random() * 1 + 0.1;
  //if id chartpie3 exist
  if (document.getElementById("chartpie31")) {
    const bar1 = new ProgressBar.Circle(chartpie31, {
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#4E9F3D", a: 0 },

      to: { color: "#ED6A5A", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = Math.round(circle.value() * 100);
        circle.setText(value + "%");
      },
    });

    //dynamic value
    bar1.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar1.text.style.fontSize = "2rem";
    bar1.text.style.color = "#999";
    bar1.animate(random1); // Number from 0.0 to 1.0
  } else if (document.getElementById("chartpie32")) {
    const bar1 = new ProgressBar.Circle(chartpie32, {
      color: "#787A91",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#787A91", a: 0 },
      to: { color: "#787A91", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = 100;
        circle.setText("OFF");
      },
    });
    //dynamic value
    bar1.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar1.text.style.fontSize = "2rem";
    //change value no stop
    bar1.animate(1.0); // Number from 0.0 to 1.0
  }
  if (document.getElementById("chartpie61")) {
    const bar2 = new ProgressBar.Circle(chartpie61, {
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#4E9F3D", a: 0 },

      to: { color: "#ED6A5A", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = Math.round(circle.value() * 30);
        //set text with celcius
        circle.setText(value);
      },
    });
    //dynamic value
    bar2.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar2.text.style.fontSize = "2rem";
    bar2.text.style.color = "#999";
    bar2.animate(random2); // Number from 0.0 to 1.0
  } else if (document.getElementById("chartpie62")) {
    const bar2 = new ProgressBar.Circle(chartpie62, {
      color: "#787A91",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#787A91", a: 0 },
      to: { color: "#787A91", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = 100;
        circle.setText("OFF");
      },
    });
    //dynamic value
    bar2.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar2.text.style.fontSize = "2rem";
    //change value no stop
    bar2.animate(1.0); // Number from 0.0 to 1.0
  }
  if (document.getElementById("chartpie21")) {
    const bar3 = new ProgressBar.Circle(chartpie21, {
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#4E9F3D", a: 0 },

      to: { color: "#ED6A5A", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = Math.round(circle.value() * 40);
        circle.setText(value + "°C");
      },
    });
    //dynamic value
    bar3.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar3.text.style.fontSize = "2rem";
    bar3.text.style.color = "#999";
    bar3.animate(random3); // Number from 0.0 to 1.0
  } else if (document.getElementById("chartpie22")) {
    const bar3 = new ProgressBar.Circle(chartpie22, {
      color: "#787A91",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#787A91", a: 0 },
      to: { color: "#787A91", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = 100;
        circle.setText("OFF");
      },
    });
    //dynamic value
    bar3.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar3.text.style.fontSize = "2rem";
    //change value no stop
    bar3.animate(1.0); // Number from 0.0 to 1.0
  }
  if (document.getElementById("chartpie41")) {
    const bar4 = new ProgressBar.Circle(chartpie41, {
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#4E9F3D", a: 0 },

      to: { color: "#ED6A5A", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = Math.round(circle.value() * 100);
        circle.setText(value + "Lux");
      },
    });
    //dynamic value
    bar4.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar4.text.style.fontSize = "2rem";
    bar4.text.style.color = "#999";
    bar4.animate(random4); // Number from 0.0 to 1.0
  } else if (document.getElementById("chartpie42")) {
    const bar4 = new ProgressBar.Circle(chartpie42, {
      color: "#787A91",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#787A91", a: 0 },
      to: { color: "#787A91", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = 100;
        circle.setText("OFF");
      },
    });
    //dynamic value
    bar4.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar4.text.style.fontSize = "2rem";
    //change value no stop
    bar4.animate(1.0); // Number from 0.0 to 1.0
  }
  if (document.getElementById("chartpie51")) {
    const bar5 = new ProgressBar.Circle(chartpie51, {
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#4E9F3D", a: 0 },
      to: { color: "#ED6A5A", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = Math.round(circle.value() * 100);
        circle.setText(value + "dBA");
      },
    });
    //dynamic value
    bar5.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar5.text.style.fontSize = "2rem";
    //change value no stop
    bar5.animate(random5); // Number from 0.0 to 1.0
  } else if (document.getElementById("chartpie52")) {
    const bar5 = new ProgressBar.Circle(chartpie52, {
      color: "#787A91",
      trailColor: "#eee",
      trailWidth: 4,
      duration: 1400,
      easing: "easeInOut",
      strokeWidth: 10,
      from: { color: "#787A91", a: 0 },
      to: { color: "#787A91", a: 2 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);

        var value = 100;
        circle.setText("OFF");
      },
    });
    //dynamic value
    bar5.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar5.text.style.fontSize = "2rem";
    //change value no stop
    bar5.animate(1.0); // Number from 0.0 to 1.0
  }
}

function updateChart() {
  //random hours
  const ChartAreaWarp = document.querySelector(".chartaAreaWrapper");

  //if route path no /Grapich

  if (window.location.pathname == "/Grapich/Suhu") {
    //update chart
    chartsuhu();
  } else if (window.location.pathname == "/Grapich/Kelembaban") {
    //update chart
    chartkelembaban();
  } else if (window.location.pathname == "/Grapich/Cahaya") {
    //update chart
    chartcahaya();
  } else if (window.location.pathname == "/Grapich/Suara") {
    //update chart
    chartsuara();
  } else if (window.location.pathname == "/Grapich/Jumlah") {
    //update chart
    chartjumlah();
  }
}

function chartjumlah() {
  const chart = new Chartist.Line(
    ".ct-chart",
    {
      //perulangan data
      labels: datajumlah.labels,
      series: datajumlah.series,
    },
    {
      stretch: true,
      low: 0,
      high: 100,
      showArea: true,
      scaleMinSpace: 20,
      //update chart
      axisY: {
        //static axisY

        type: Chartist.FixedScaleAxis,
        divisor: 6,
        high: 100,
        low: 0,

        labelInterpolationFnc: function (value) {
          parse = value.toFixed(0);
          return parse;
        },
      },
      axisX: {
        labelInterpolationFnc: function (value) {
          return value;
        },
      },
      plugins: [
        Chartist.plugins.ctPointLabels({
          textAnchor: "middle",
          labelInterpolationFnc: function (value) {
            return value;
          },
        }),
      ],
    }
  );
  if (chart.data.labels.length > 10) {
    //scroll chart
    chart.data.labels.shift();
    chart.data.series[0].shift();
    chart.update();
  }
}

function chartsuara() {
  const chart = new Chartist.Line(
    ".ct-chart",
    {
      //perulangan data
      labels: datakebisingan.labels,
      series: datakebisingan.series,
    },
    {
      stretch: true,
      low: 0,
      high: 100,
      showArea: true,
      scaleMinSpace: 20,
      //update chart
      axisY: {
        //static axisY

        type: Chartist.FixedScaleAxis,
        divisor: 6,
        high: 100,
        low: 0,

        labelInterpolationFnc: function (value) {
          parse = value.toFixed(0);
          return parse + "dBA";
        },
      },
      axisX: {
        labelInterpolationFnc: function (value) {
          return value;
        },
      },
      plugins: [
        Chartist.plugins.ctPointLabels({
          textAnchor: "middle",
          labelInterpolationFnc: function (value) {
            return value + "dBA";
          },
        }),
      ],
    }
  );
  if (chart.data.labels.length > 10) {
    //scroll chart
    chart.data.labels.shift();
    chart.data.series[0].shift();
    chart.update();
  }
}

function chartkelembaban() {
  const chart = new Chartist.Line(
    ".ct-chart",
    {
      //perulangan data
      labels: datakelembaban.labels,
      series: datakelembaban.series,
    },
    {
      stretch: true,
      low: 0,
      high: 100,
      showArea: true,
      scaleMinSpace: 20,
      //update chart
      axisY: {
        //static axisY

        type: Chartist.FixedScaleAxis,
        divisor: 6,
        high: 100,
        low: 0,

        labelInterpolationFnc: function (value) {
          parse = value.toFixed(0);
          return parse + "%";
        },
      },
      axisX: {
        labelInterpolationFnc: function (value, index) {
          return index % 2 === 0 ? value : null;
        },
      },
      plugins: [
        Chartist.plugins.ctPointLabels({
          textAnchor: "middle",
          labelInterpolationFnc: function (value) {
            return value + "%";
          },
        }),
      ],
    }
  );
  if (chart.data.labels.length > 10) {
    //scroll chart
    chart.data.labels.shift();
    chart.data.series[0].shift();
    chart.update();
  }
}

function chartcahaya() {
  const chart = new Chartist.Line(
    ".ct-chart",
    {
      //perulangan data
      labels: datacahaya.labels,
      series: datacahaya.series,
    },
    {
      stretch: true,
      low: 0,
      high: 100,
      showArea: true,
      scaleMinSpace: 20,
      //update chart
      axisY: {
        //static axisY

        type: Chartist.FixedScaleAxis,
        divisor: 6,
        high: 100,
        low: 0,

        labelInterpolationFnc: function (value) {
          parse = value.toFixed(0);
          return parse + "Lux";
        },
      },
      axisX: {
        labelInterpolationFnc: function (value, index) {
          return index % 2 === 0 ? value : null;
        },
      },
      plugins: [
        Chartist.plugins.ctPointLabels({
          textAnchor: "middle",
          labelInterpolationFnc: function (value) {
            return value + "Lux";
          },
        }),
      ],
    }
  );
  if (chart.data.labels.length > 10) {
    //scroll chart
    chart.data.labels.shift();
    chart.data.series[0].shift();
    chart.update();
  }
}

function chartsuhu() {
  const chart = new Chartist.Line(
    ".ct-chart",
    {
      //perulangan data
      labels: datasuhu.labels,
      series: datasuhu.series,
    },
    {
      stretch: true,
      low: 0,
      high: 40,
      showArea: true,
      scaleMinSpace: 20,
      //update chart
      axisY: {
        //static axisY

        type: Chartist.FixedScaleAxis,
        divisor: 6,
        high: 40,
        low: 0,

        labelInterpolationFnc: function (value) {
          parse = value.toFixed(0);
          return parse + "°C";
        },
      },
      axisX: {
        labelInterpolationFnc: function (value, index) {
          return index % 2 === 0 ? value : null;
        },
        scrollable: true,
        scrollbarHeight: 10,
      },
      //menambahkan tooltip
      plugins: [
        Chartist.plugins.ctPointLabels({
          textAnchor: "middle",
          labelInterpolationFnc: function (value) {
            return value + "°C";
          },
        }),
      ],
    }
  );
  if (chart.data.labels.length > 10) {
    //scroll chart
    chart.data.labels.shift();
    chart.data.series[0].shift();
    chart.update();
  }
}

function chng() {
  var typ = document.getElementById("gambar").value;
  var res = typ.match(".jp");

  if (!res) {
    alert("Hanya file jpg/jpeg yang diterima");
    document.getElementById("gambar").value = "";
  }
}

function valvideo() {
  var typ = document.getElementById("video").value;
  var res = typ.match(".mp4");

  if (!res) {
    alert("Hanya file mp4 yang diterima");
    document.getElementById("video").value = "";
  }
}

function top5room() {
  //sort array
  dataroom.sort(function (a, b) {
    return b.data - a.data;
  });

  var list = document.getElementById("myList");
  //if list not empty
  if (list.hasChildNodes()) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }

  var length = dataroom.length;
  if (length > 5) {
    length = 5;
  }

  //update data
  for (var i = 0; i < length; i++) {
    var item = document.createElement("li");
    //menampilkan name progress bar dan button detail
    //value progres bar berubah warna sesuai dengan data
    //class row untuk membuat 3  kolom
    var warna = "bg-success";
    if (dataroom[i].data > 80) {
      warna = "bg-danger";
    } else if (dataroom[i].data > 60) {
      warna = "bg-warning";
    } else {
      warna = "bg-success";
    }
    item.innerHTML =
      '<div class="row"><div class="col-6">' +
      dataroom[i].name +
      "</div><div class='col-6'><div class='progress'><div class='progress-bar progress-bar-striped progress-bar-animated " +
      warna +
      " ' role='progressbar' style='width:" +
      dataroom[i].data +
      "%' aria-valuenow='" +
      dataroom[i].data +
      "' aria-valuemin='0' aria-valuemax='100'>" +
      dataroom[i].data +
      "%</div></div></div></div>";

    list.appendChild(item);
  }
}

function colorbadge() {
  for (var i = 0; i < dataroom.length; i++) {
    var random = Math.floor(Math.random() * 100);
    var status = document.getElementById("status" + dataroom[i].id);
    if (status != null) {
      if (dataroom[i].data > 80) {
        //add class border-danger and remove
        status.innerHTML = "Bahaya";
        status.classList.remove("bg-success");
        status.classList.remove("bg-warning");
        status.classList.add("bg-danger");
      } else if (dataroom[i].data > 60) {
        //add class border-warning and remove
        status.innerHTML = "Siaga";
        status.classList.remove("bg-success");
        status.classList.remove("bg-danger");
        status.classList.add("bg-warning");
      } else {
        //add class border-success and
        status.innerHTML = "Aman";
        status.classList.remove("bg-danger");
        status.classList.remove("bg-warning");
        status.classList.add("bg-success");
      }
    } else {
    }
  }
}

function top5home() {
  dataroom.sort(function (a, b) {
    return b.data - a.data;
  });

  var table = document.getElementById("top5home");

  //if table not empty
  if (table != null) {
    if (table.hasChildNodes()) {
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }
    }

    //table on show 5 data

    //update data
    var length = dataroom.length;
    if (length > 5) {
      length = 5;
    }

    for (var i = 0; i < length; i++) {
      item = document.createElement("tr");
      item.innerHTML =
        "<td>" +
        dataroom[i].name +
        "</td><td>" +
        "<span id='status" +
        dataroom[i].id +
        "' class='badge bg-success '>Aman</span></td><td ><a href='/Ruangan/" +
        dataroom[i].id +
        "' class='btn btn-primary'>Detail</a></td></tr>";
      table.appendChild(item);
    }
  }
}

function colorborder() {
  //mengubah warna border sesuai dengan data

  for (var i = 0; i < dataroom.length; i++) {
    var random = Math.floor(Math.random() * 100);
    var ruang = document.getElementById("ruang" + dataroom[i].id);
    if (random > 80) {
      //add class border-danger and remove
      ruang.classList.remove("border-success");
      ruang.classList.remove("border-warning");
      ruang.classList.add("border-danger");
    } else if (random > 60) {
      //add class border-warning and remove
      ruang.classList.remove("border-success");
      ruang.classList.remove("border-danger");
      ruang.classList.add("border-warning");
    } else {
      //add class border-success and

      ruang.classList.remove("border-danger");
      ruang.classList.remove("border-warning");
      ruang.classList.add("border-success");
    }
  }
}

function changegrapik() {
  var sensor = document.getElementById("sensor").value;

  if (sensor == "Suhu") {
    //change window path
    window.location.href = "http://127.0.0.1:5000/Grapich/Suhu";
  } else if (sensor == "Kelembaban") {
    //change window path
    window.location.href = "http://127.0.0.1:5000/Grapich/Kelembaban";
  } else if (sensor == "Pencahayaan") {
    //change window path
    window.location.href = "http://127.0.0.1:5000/Grapich/Cahaya";
  } else if (sensor == "Jumlah Orang") {
    //change window path
    window.location.href = "http://127.0.0.1:5000/Grapich/Jumlah";
  } else if (sensor == "Kebisingan") {
    //change window path
    window.location.href = "http://127.0.0.1:5000/Grapich/Suara";
  }
}

function changegrapik1() {
  var date1 = document.getElementById("date1").value;
  var date2 = document.getElementById("date2").value;
  if (date1 == null || date2 == null) {
    return;
  }

  if (date1 != "" && date2 != "") {
    resetgrapik();
  } else {
  }
}

function onsensor(id) {
  //ajax post data to updatestatus
  //check checkbox checked or not
  var status = document.getElementById(id).checked;
  if (status == true) {
    status = 2;
  } else {
    status = 1;
  }
  // $.ajax({
  //   url: "/Ruangan/UpdateStatus",
  //   type: "POST",
  //   data: {
  //     id: id,
  //     status: status,
  //   },
  //   success: function (data) {
  //     console.log(data);
  //   },
  // });
}

$(document).ready(function () {
  $("#status").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var id = button.data("id");
    var value = button.data("value");
    var modal = $(this);
    modal.find(".modal-body input.id").val(id);
    if (value == 1) {
      modal.find(".modal-body select").val(1);
    } else {
      modal.find(".modal-body select").val(2);
    }
  });
});
