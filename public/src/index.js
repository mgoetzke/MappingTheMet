import "./styles/index.scss";
import { renderMap } from "./scripts/map.js";
import { renderDetails } from "./scripts/details.js";
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  console.log("about to render");
  renderDetails("info");
  axios.get("/objects").then(fetchResponse => {
    renderMap(fetchResponse.data);
  });
});
