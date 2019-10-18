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
        `The Metropolitan Museum of Art holds over two million artworks in its permanent collection. 
        Mapping the Met uses the museum's API to access geolocation information on 470,000 of those objects.`
      )
      .append("p")
      .html(`Click around the globe to explore where the artwork comes from.`)
      ;

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
      // let exit = d3
      //   .select("#details-holder")
      //   .append("div")
      //   .attr("id", "details_ID");
      deets.append("h1").text(prompt);
      deets
        .append("p")
        .html(`<span>Total objects: ${details.total}</span>`)
        .append("p")
        .html(`<span>Total on display: ${details.displayed}</span>`)
        .append("p")
        .html(`<span>Collection Highlights: ${details.highlights}`);
      // exit.append("p")
      // .html(`<button onClick={console.log("hi")}>Exit</button>`)
    });
    console.log(prompt);
  }
}
