import "./styles/index.scss";
import { renderMap } from "./scripts/map.js";
import { renderDetails } from "./scripts/details.js";
import { renderSpinner } from "./scripts/spinner.js";
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  console.log("about to render");
  renderDetails("info");
  renderSpinner("#map-holder");
  axios.get("/objects").then(fetchResponse => {
    renderMap(fetchResponse.data);
  });
});
