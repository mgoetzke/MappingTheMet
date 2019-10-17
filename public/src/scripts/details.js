var width = 960;
var height = 500;

var svg = d3
  .select("#details-holder")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "details");

svg
  .append("rect")
  .attr("width", 345)
  .attr("height", 234)
  .attr("fill", "red");
