import "./styles/index.scss";
import { renderMap } from "./scripts/map.js";
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  console.log("about to render");
  axios.get("/objects").then(fetchResponse => {
    renderMap(fetchResponse.data);
  });
});
