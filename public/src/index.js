import "./styles/index.scss";
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerText = "Hello World!";
  // let testLocation = "Germany";
  // axios.get(`/objects/${testLocation}`).then(response => {
  //   console.log(response);
  // });
  // ^ this gets objects for one location
  // debugger;
  axios.get("/objects/all").then(response => {
    debugger;
    console.log(response);
  });
});
