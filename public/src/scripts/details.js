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
      deets
        // .append("p")
        // .html(`<span>Total objects: ${details.total}</span>`)
        // .append("p")
        // .html(`<span>Total on display: ${details.displayed}</span>`)
        // .append("p")
        // .html(`<span>Collection highlights: ${details.highlights}`);
        .append("p")
        .html(
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
      // d3.select("#dates_ID").remove();
      // var svg = d3.select('#dates-holder').append('svg');
      // svg.attr('width', 300).attr('height', 200)
      // var margin = {
      //   top: 10,
      //   right: 20,
      //   bottom: 20,
      //   left: 40
      // },
      //   width = +svg.attr("width") - margin.left - margin.right,
      //   height = +svg.attr("height") - margin.top - margin.bottom,
      //   id = +svg.attr('id','dates_ID'),
      //   g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // var x = d3.scaleBand()
      //   .rangeRound([0, width])
      //   .padding(0.1);

      // var y = d3.scaleLinear()
      //   .rangeRound([height, 0]);

      //   x.domain(data.map(function (d) {
      //     return d.year;
      //   }));
      //   y.domain([0, d3.max(data, function (d) {
      //     return Number(d.total);
      //   })]);

      //   g.append("g")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(d3.axisBottom(x))

      //   g.append("g")
      //     .call(d3.axisLeft(y))
      //     .append("text")
      //     .attr("fill", "#123")
      //     .attr("transform", "rotate(-90)")
      //     .attr("y", 6)
      //     .attr("dy", "0.71em")
      //     .attr("text-anchor", "end")
      //     .text("Total");

      //   g.selectAll(".bar")
      //     .data(data)
      //     .enter().append("rect")
      //     .attr("class", "bar")
      //     .attr("x", function (d) {
      //       return x(d.year);
      //     })
      //     .attr("y", function (d) {
      //       return y(Number(d.total));
      //     })
      //     .attr("width", x.bandwidth())
      //     .attr("height", function (d) {
      //       return height - y(Number(d.total));
      //     });
    });
  }
}
