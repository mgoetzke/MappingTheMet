import * as d3 from "d3";
const axios = require("axios");

function fetchDetails(country) {
  return axios.get(`/details/${country}`);
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
        `The Metropolitan Museum of Art holds over 400,000 objects in its collection. Click around the globe to explore where the artwork comes from.`
      );

    console.log("Test");
  } else {
    let details;
    fetchDetails(prompt).then(response => {
      details = response.data;

      d3.select("#details_ID").remove();
      let deets = d3
        .select("#details-holder")
        .append("div")
        .attr("id", "details_ID");
      deets.append("h1").text(prompt);
      deets
        .append("p")
        .html(`<span>Total objects: ${details.total}</span>`)
        .append("p")
        .html(`<span>Total on display: ${details.displayed}</span>`)
        .append("p")
        .html(`<span>Collection Highlights: ${details.highlights}`);
    });
    console.log(prompt);
  }
}
