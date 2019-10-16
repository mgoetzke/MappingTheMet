const renderMap = fullData => {
    const width = 500;
    const height = 300;

    const svg = d3.select(".map-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

    //map and projection
    var path = d3.geoPath();
    var projection = d3.geoMercator()
    .scale(70)
    .center([0,20])
    .translate([width/2, height/2]);

    //data and color scale
    var data = d3.map();
    var colorScale = d3.scaleThreshold()
    .domain([100, 500, 1000,  3000, 7000])
    .range(d3.schemeBlues[5]);

    d3.queue()
        .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        .await(ready);
    
    function ready(error, topo){
        //draw map
        svg.append("c")
        .selectAll("path")
        .enter()
        .append("path")
        .attr("d", d3.geoPath()
        .projection(projection)
        )
        // set color
        .attr("fill", function (d){
            // HARD CODE COLOR
            return colorScale(1000);
        });
    }
}