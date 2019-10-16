// window.d3 = require("d3");
// import { select } from "d3-selection";
// var d3 = require("d3");
// import d3 from "../../assets/d3/import.js";
import * as d3 from "d3";
export const renderMap = () => {
  const width = 3000;
  const height = 1250;

  var minZoom;
  var maxZoom;

  // Define map projection
  var projection = d3
    .geoEquirectangular()
    .center([0, 15]) // set centre to further North
    .scale([width / (2 * Math.PI)]) // scale to fit group width
    .translate([width / 2, height / 2]);

  var path = d3.geoPath().projection(projection);

  function getTextBox(selection) {
    selection.each(function(d) {
      d.bbox = this.getBBox();
    });
  }

  var svgContainer = d3
    .select("div#map-holder")
    .append("svg")
    .attr("width", 1500)
    .attr("height", 625);

  d3.json("../../assets/countries.geo.json", function(json) {
    console.log("x");
  });

  var circle = svgContainer
    .append("circle")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 50)
    .attr("fill", "red");
};
