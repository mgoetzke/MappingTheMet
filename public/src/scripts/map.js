import * as d3 from "d3";
import * as topojson from "topojson";
import { renderDetails } from "./details";
export function renderMap(allCountryData) {
  let config = {
    speed: 0.005,
    verticalTilt: 0,
    horizontalTilt: 0
  };
  let fullData = allCountryData;

  var colorById = {}; // Create empty object for holding dataset
  var detailsById = {}; //Empty object holds country deets
  fullData.forEach(function(d) {
    colorById[d.id] = +d.total; // Create property for each ID, give it value from rate
    detailsById[d.id] = d.country;
  });
  var color = d3
    .scaleThreshold()
    .domain([4, 5, 10, 20, 50])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

  var width = 600;
  var height = 500;
  var focused;

  var projection = d3
    .geoOrthographic()
    .scale(250)
    .translate([width / 1.8, height / 2]);
  var plane_path = d3.geoPath().projection(projection);

  d3.select("#spinner").remove();
  var globe = d3
    .select("#map-holder")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");
  globe
    .append("path")
    .datum({ type: "Sphere" })
    .attr("class", "water")
    .style("fill", "lightblue")
    .attr("d", path);
  var g = globe.append("g").attr("class", "countries");

  var path = d3.geoPath().projection(projection);
  d3.json("../../assets/countries.geo.json").then(function(topology) {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter()
      .append("path")
      .attr("fill", "red")
      .attr("stroke", "#EDECF4")
      .attr("d", path)
      .attr("name", function(d) {
        return detailsById[d.id];
      })
      .style("fill", function(d) {
        return color(colorById[d.id]);
      })
      .on("click", function(d) {
        addClass(d);
        rotateMe(d);
      });
  });
  let timer;
  function rotateGlobe() {
    timer = d3.timer(function(elapsed) {
      projection.rotate([
        config.speed * elapsed - 120,
        config.verticalTilt,
        config.horizontalTilt
      ]);
      globe.selectAll("path").attr("d", path);
    });
  }
  function stopGlobe() {
    timer.stop();
  }
  var rotateMe = function(d) {
    (function transition() {
      d3.transition()
        .duration(1250)
        .tween("rotate", function() {
          var p = d3.geoCentroid(d);
          var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            globe.selectAll("path").attr("d", path);
          };
        });
    })();
    stopGlobe();
  };
  var addClass = function(d) {};
  rotateGlobe();

  const worldMap = document.getElementsByClassName("countries")[0];
  worldMap.addEventListener("click", e => {
    const id = e.target.__data__.id;
    const name = e.target.getAttribute("name");
    renderDetails(name);
  });
}
