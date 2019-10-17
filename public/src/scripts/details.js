import * as d3 from "d3";
const axios = require("axios");

function fetchDetails(country) {
  return axios.get(`/details/${country}`);
}

export function renderDetails(prompt) {
  if (prompt === "info") {
    var svg = d3
      .select("#details-holder")
      .append("svg")
      .attr("id", "details_ID")
      .attr("width", 500)
      .attr("height", 500)
      .attr("class", "details");

    svg
      .append("rect")
      .attr("width", 345)
      .attr("height", 234)
      .attr("fill", "red");
    console.log("Test");
  } else {
    let details;
    fetchDetails(prompt).then(response => {
      details = response.data;
      debugger;
      d3.select("#details_ID").remove();
      var deets = d3
        .select("#details-holder")
        .append("svg")
        .attr("id", "details_ID")
        .attr("width", 500)
        .attr("height", 500)
        .attr("class", "details");
      deets
        .append("text")
        .text(prompt)
        .attr("y", 100)
        .attr("x", 30)
        .style("text-anchor", "start");
      deets
        .append("text")
        .text(`Total objects: ${details.total}`)
        .attr("y", 120)
        .attr("x", 30)
        .style("text-anchor", "start");
      deets
        .append("text")
        .text(`Total on display: ${details.displayed}`)
        .attr("y", 140)
        .attr("x", 30)
        .style("text-anchor", "start");
      deets
        .append("text")
        .text(`Collection Highlights: ${details.highlights}`)
        .attr("y", 160)
        .attr("x", 30)
        .style("text-anchor", "start");
    });
    console.log(prompt);
  }
}
