export function renderSpinner(){
    var spinner = d3
        .select("#map-holder")
        .append(`p`)
        .attr('id','spinner')
        .html(`<div class="loader"></div>`)
}