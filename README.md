# Mapping the Met

**Mapping the Met** uses The Metropolitan Museum of Art Collection API to delve deeper into the origins of its pieces and allows the user to examine the country of origin of artworks by year, and whether the piece of art is designated a "highlight" or even on display.

[Live Site](http://mappingthemet.herokuapp.com/)

## Tech/Framework Used

**Mapping the Met** was built with

- JavaScript for data retrieval and computation
- DS.js for data visualization
- External API (The Metropolitan Museum of Art Collection API) for data source
- Webpack and Babel to bundle files
- Express.js for building out API calls

## Features

- Global overview of the museums's collection by country of origin
- Examine the museum's collection by country of origin to explore 'on-view' and 'highlight' designation
- Explore the museum's collection by country of orgin and year of creation

## Feature Highlights

- Clickable globe to examine collection by country

![alt text](public/assets/images/globe.png "Mapping the Met Globe")

- Detailed breakdown of collection by country

![alt text](https://media.giphy.com/media/Sw7MVx2imq6kh1fLXV/giphy.gif "Mapping the Met Country Breakdown")

- Fetch collection information for all countries before rendering (using Express.js)

*./app.js*
```JavaScript
app.get("/objects/", (request, response) => {
  let promises = countries.map(country => {
    let result = { country: "", id: 0, total: 0 };
    return fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${country.name}&q=*`
    )
      .then(response => {
        return response.text();
      })
      .then(body => {
        let results = JSON.parse(body);
        result.country = country.name;
        result.id = country.id;
        result.total = results.total;
        return result;
      });
  });
  Promise.all(promises).then(data => {
    response.send(data);
  });
});
```
## Data & APIs

Artwork information is available for free through The Metropolitan Museum of Art Collection API which provides information on 450,000 of the museum's two million artworks.

## Wireframe

Mapping the Met will consist of a single page that allows users to view a globe (a) presenting data for all countries or click on a particular country (b) to get country-specific information (c) and country-specific graphs (d). A footer (e) will contain author information.
![Wireframe](public/assets/images/wireframe.png)

## Future Features

- Exploration by year of acquisition
