// window.d3 = require("d3");
// import { select } from "d3-selection";
// var d3 = require("d3");
// import d3 from "../../assets/d3/import.js";
import * as d3 from "d3";
import * as topojson from "topojson";

export const renderMap = allCountryData => {
  function colorCountry(country) {
    let allData = allCountryData;
    debugger;
    return "#581845";
  }
  var width = 960,
    height = 500;

  var projection = d3
    .geoMercator()
    .scale(200)
    .translate([width / 2.2, height / 1.5]);
  var plane_path = d3.geoPath().projection(projection);

  var svg = d3
    .select("#map-holder")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

  var g = svg.append("g");
  var path = d3.geoPath().projection(projection);
  d3.json("../../assets/countries.geo.json").then(function(topology) {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter()
      .append("path")
      .attr("fill", "#1E1E2F")
      .attr("stroke", "#EDECF4")
      .attr("d", path)
      .attr("fill", colorCountry);
  });
};
