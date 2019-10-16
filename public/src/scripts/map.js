// window.d3 = require("d3");
// import { select } from "d3-selection";
// var d3 = require("d3");
// import d3 from "../../assets/d3/import.js";
import * as d3 from "d3";
import * as topojson from "topojson";

export function renderMap(allCountryData) {
  let config = {
    speed: 0.005,
    verticalTilt: 0,
    horizontalTilt: 0
  };
  let stopRotation = false;
  let lastElapse = 0;
  let fullData = allCountryData;
  let test = 100;
  function colorCountry() {
    return "#581845";
  }
  var colorById = {}; // Create empty object for holding dataset
  fullData.forEach(function(d) {
    colorById[d.id] = +d.total; // Create property for each ID, give it value from rate
  });
  var color = d3
    .scaleThreshold()
    .domain([4, 5, 10, 20, 50])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

  var width = 960;
  var height = 500;

  var projection = d3
    .geoOrthographic()
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
      .attr("fill", "red")
      .attr("stroke", "#EDECF4")
      .attr("d", path)
      .style("fill", function(d) {
        return color(colorById[d.id]);
      });
  });

  d3.timer(function (elapsed) {
    projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
    svg.selectAll("path").attr("d", path);
    drawMarkers();
  });
}
