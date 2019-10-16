import "./styles/index.scss";
import { renderMap } from "./scripts/map.js";
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerText = "Hello World!";
  axios.get("/objects").then(fetchResponse => {
    renderMap(fetchResponse.data);
  });
});
