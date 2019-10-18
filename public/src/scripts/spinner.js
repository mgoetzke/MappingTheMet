export function renderSpinner(){
    var spinner = d3
        .select("#map-holder")
        .append('p')
        .html(`<div id="spinner" class="loader"></div>`)
}