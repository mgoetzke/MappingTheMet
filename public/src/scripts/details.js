import * as d3 from "d3";
const axios = require("axios");
var Chart = require("chart.js");

function fetchDetails(country) {
  return axios.get(`/details/${country}`);
}

function fetchDates(country) {
  return axios.get(`/dates/${country}`);
}

export function renderDetails(prompt) {
  if (prompt === "info") {
    d3.select("#details_ID").remove();
    var ctx = document.getElementById("dates-chart");
    if (ctx.$chartjs) {
      window.myChart.destroy();
    }
    let info = d3
      .select("#details-holder")
      .append("div")
      .attr("id", "details_ID");
    info.append("h1").text("Mapping the Met");
    info
      .append("p")
      .html(
        `The Metropolitan Museum of Art holds over two million artworks in its permanent collection. 
        Mapping the Met uses the museum's API to access geolocation information on 470,000 of those objects.`
      )
      .append("p")
      .html(`</br>`)
      .append("p")
      .html(
        `Inconsistencies between present-day country names and historical culture names
        may exist and are not accounted for in this data visualization.`
      )
      .append("p")
      .html(`</br>`)
      .append("p")
      .html(
        `<span class="bold">Click</span> around the globe to explore where the artwork comes from.`
      );
  } else {
    let details;
    fetchDetails(prompt).then(response => {
      details = response.data;

      d3.select("#details_ID").remove();
      let deets = d3
        .select("#details-holder")
        .append("div")
        .attr("id", "details_ID");
      // let exit = d3
      //   .select("#details-holder")
      //   .append("div")
      //   .attr("id", "details_ID");
      let totalWord = details.total === 1 ? "artwork" : "artworks";
      let displayWord = details.displayed === 1 ? "is" : "are";
      let highlightWords =
        details.highlights === 1
          ? "is designated a collection highlight"
          : "are designated collection highlights";
      deets.append("h1").text(prompt);
      deets.append("p").html(
        `The Metropolitan Museum of Art has <span class="bold">${details.total}</span>
          ${totalWord} from <span class="bold">${prompt}</span> in its collection. 
          Of those, <span class="bold">${details.displayed}</span> ${displayWord} on display and
          <span class="bold">${details.highlights}</span> ${highlightWords}.`
      );
      // exit.append("p")
      // .html(`<button onClick={}>Exit</button>`)
    });

    fetchDates(prompt).then(response => {
      let data = response.data;
      let years = [];
      let values = [];
      data.forEach(row => {
        years.push(Object.values(row)[0]);
        values.push(Object.values(row)[1]);
      });

      var ctx = document.getElementById("dates-chart");
      if (ctx.$chartjs) {
        window.myChart.destroy();
      }
      window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: years,
          datasets: [
            {
              label: "Artworks",
              data: values,
              backgroundColor: "rgb(57, 0, 111)"
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Object count"
                }
              }
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Century"
                }
              }
            ]
          },
          legend: { display: false },
          title: {
            display: true,
            text: "Holdings by object creation date"
          }
        }
      });
    });
  }
}
