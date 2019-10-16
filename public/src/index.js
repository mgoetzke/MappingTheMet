import "./styles/index.scss";
import { renderMap } from "./scripts/map.js";
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerText = "Hello World!";
  renderMap();
  // axios.get("/objects").then(response => {
  //   console.log(response);
  // });
});
