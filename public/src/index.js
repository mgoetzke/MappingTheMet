import "./styles/index.scss";
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerText = "Hello World!";
  
  axios.get("/objects/all").then(response => {
    debugger;
    console.log(response);
  });
});
