const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 8080; // process.env accesses heroku's environment variables
const Axios = require("axios");
app.use(express.static("public"));

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "./public/dist/index.html"));
});

// create route to get all objects for one country
app.get("/objects/:location", (request, response) => {
  // make api call using fetch
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${request.params.location}&q=""`
  )
    .then(response => {
      return response.text();
    })
    .then(body => {
      let results = JSON.parse(body);
      console.log(results); // logs to server
      response.send(results); // sends to frontend
    });
});

// create route to get total objects for all countries
app.get("/objects/", (request, response) => {
  // make api call using fetch
  let countries = [
    {
      id: "4",
      name: "Afghanistan"
    },
    // {
    //   id: "8",
    //   name: "Albania"
    // },
    // {
    //   id: "12",
    //   name: "Algeria"
    // },
    // {
    //   id: "20",
    //   name: "Andorra"
    // },
    // {
    //   id: "24",
    //   name: "Angola"
    // },
    // {
    //   id: "660",
    //   name: "Anguilla"
    // },
    // {
    //   id: "28",
    //   name: "Antigua and Barbuda"
    // },
    // {
    //   id: "32",
    //   name: "Argentina"
    // },
    // {
    //   id: "51",
    //   name: "Armenia"
    // },
    // {
    //   id: "533",
    //   name: "Aruba"
    // },
    // {
    //   id: "36",
    //   name: "Australia"
    // },
    // {
    //   id: "40",
    //   name: "Austria"
    // },
    // {
    //   id: "31",
    //   name: "Azerbaijan"
    // },
    // {
    //   id: "44",
    //   name: "Bahamas"
    // },
    // {
    //   id: "48",
    //   name: "Bahrain"
    // },
    // {
    //   id: "50",
    //   name: "Bangladesh"
    // },
    // {
    //   id: "52",
    //   name: "Barbados"
    // },
    // {
    //   id: "112",
    //   name: "Belarus"
    // },
    // {
    //   id: "56",
    //   name: "Belgium"
    // },
    // {
    //   id: "58",
    //   name: "Belgium-Luxembourg"
    // },
    // {
    //   id: "84",
    //   name: "Belize"
    // },
    // {
    //   id: "204",
    //   name: "Benin"
    // },
    // {
    //   id: "60",
    //   name: "Bermuda"
    // },
    // {
    //   id: "64",
    //   name: "Bhutan"
    // },
    // {
    //   id: "68",
    //   name: "Bolivia"
    // },
    // {
    //   id: "535",
    //   name: "Bonaire"
    // },
    // {
    //   id: "70",
    //   name: "Bosnia Herzegovina"
    // },
    // {
    //   id: "72",
    //   name: "Botswana"
    // },
    // {
    //   id: "92",
    //   name: "Br. Virgin Isds"
    // },
    // {
    //   id: "76",
    //   name: "Brazil"
    // },
    // {
    //   id: "96",
    //   name: "Brunei Darussalam"
    // },
    // {
    //   id: "100",
    //   name: "Bulgaria"
    // },
    // {
    //   id: "854",
    //   name: "Burkina Faso"
    // },
    // {
    //   id: "108",
    //   name: "Burundi"
    // },
    // {
    //   id: "132",
    //   name: "Cabo Verde"
    // },
    // {
    //   id: "116",
    //   name: "Cambodia"
    // },
    // {
    //   id: "120",
    //   name: "Cameroon"
    // },
    // {
    //   id: "124",
    //   name: "Canada"
    // },
    // {
    //   id: "136",
    //   name: "Cayman Isds"
    // },
    // {
    //   id: "140",
    //   name: "Central African Rep."
    // },
    // {
    //   id: "148",
    //   name: "Chad"
    // },
    // {
    //   id: "152",
    //   name: "Chile"
    // },
    // {
    //   id: "156",
    //   name: "China"
    // },
    // {
    //   id: "344",
    //   name: "China, Hong Kong SAR"
    // },
    // {
    //   id: "446",
    //   name: "China, Macao SAR"
    // },
    // {
    //   id: "170",
    //   name: "Colombia"
    // },
    // {
    //   id: "174",
    //   name: "Comoros"
    // },
    // {
    //   id: "178",
    //   name: "Congo"
    // },
    // {
    //   id: "184",
    //   name: "Cook Isds"
    // },
    // {
    //   id: "188",
    //   name: "Costa Rica"
    // },
    // {
    //   id: "384",
    //   name: "Côte d'Ivoire"
    // },
    // {
    //   id: "191",
    //   name: "Croatia"
    // },
    // {
    //   id: "192",
    //   name: "Cuba"
    // },
    // {
    //   id: "531",
    //   name: "Curaçao"
    // },
    // {
    //   id: "196",
    //   name: "Cyprus"
    // },
    // {
    //   id: "203",
    //   name: "Czechia"
    // },
    // {
    //   id: "200",
    //   name: "Czechoslovakia"
    // },
    // {
    //   id: "408",
    //   name: "Dem. People's Rep. of Korea"
    // },
    // {
    //   id: "180",
    //   name: "Dem. Rep. of the Congo"
    // },
    // {
    //   id: "208",
    //   name: "Denmark"
    // },
    // {
    //   id: "262",
    //   name: "Djibouti"
    // },
    // {
    //   id: "212",
    //   name: "Dominica"
    // },
    // {
    //   id: "214",
    //   name: "Dominican Rep."
    // },
    // {
    //   id: "218",
    //   name: "Ecuador"
    // },
    // {
    //   id: "818",
    //   name: "Egypt"
    // },
    // {
    //   id: "222",
    //   name: "El Salvador"
    // },
    // {
    //   id: "226",
    //   name: "Equatorial Guinea"
    // },
    // {
    //   id: "232",
    //   name: "Eritrea"
    // },
    // {
    //   id: "233",
    //   name: "Estonia"
    // },
    // {
    //   id: "231",
    //   name: "Ethiopia"
    // },

    // {
    //   id: "234",
    //   name: "Faeroe Isds"
    // },
    // {
    //   id: "238",
    //   name: "Falkland Isds (Malvinas)"
    // },
    // {
    //   id: "242",
    //   name: "Fiji"
    // },
    // {
    //   id: "246",
    //   name: "Finland"
    // },

    // {
    //   id: "250",
    //   name: "France"
    // },
    // {
    //   id: "254",
    //   name: "French Guiana"
    // },
    // {
    //   id: "258",
    //   name: "French Polynesia"
    // },
    // {
    //   id: "583",
    //   name: "FS Micronesia"
    // },
    // {
    //   id: "266",
    //   name: "Gabon"
    // },
    // {
    //   id: "270",
    //   name: "Gambia"
    // },
    // {
    //   id: "268",
    //   name: "Georgia"
    // },
    // {
    //   id: "276",
    //   name: "Germany"
    // },
    // {
    //   id: "288",
    //   name: "Ghana"
    // },
    // {
    //   id: "292",
    //   name: "Gibraltar"
    // },
    // {
    //   id: "300",
    //   name: "Greece"
    // },
    // {
    //   id: "304",
    //   name: "Greenland"
    // },
    // {
    //   id: "308",
    //   name: "Grenada"
    // },
    // {
    //   id: "312",
    //   name: "Guadeloupe"
    // },
    // {
    //   id: "320",
    //   name: "Guatemala"
    // },
    // {
    //   id: "324",
    //   name: "Guinea"
    // },
    // {
    //   id: "624",
    //   name: "Guinea-Bissau"
    // },
    // {
    //   id: "328",
    //   name: "Guyana"
    // },
    // {
    //   id: "332",
    //   name: "Haiti"
    // },
    // {
    //   id: "336",
    //   name: "Holy See (Vatican City State)"
    // },
    // {
    //   id: "340",
    //   name: "Honduras"
    // },
    // {
    //   id: "348",
    //   name: "Hungary"
    // },
    // {
    //   id: "352",
    //   name: "Iceland"
    // },
    // {
    //   id: "356",
    //   name: "India"
    // },
    // {
    //   id: "360",
    //   name: "Indonesia"
    // },
    // {
    //   id: "364",
    //   name: "Iran"
    // },
    // {
    //   id: "368",
    //   name: "Iraq"
    // },
    // {
    //   id: "372",
    //   name: "Ireland"
    // },
    // {
    //   id: "376",
    //   name: "Israel"
    // },
    // {
    //   id: "381",
    //   name: "Italy"
    // },
    // {
    //   id: "388",
    //   name: "Jamaica"
    // },
    // {
    //   id: "392",
    //   name: "Japan"
    // },
    // {
    //   id: "400",
    //   name: "Jordan"
    // },
    // {
    //   id: "398",
    //   name: "Kazakhstan"
    // },
    // {
    //   id: "404",
    //   name: "Kenya"
    // },
    // {
    //   id: "296",
    //   name: "Kiribati"
    // },
    // {
    //   id: "414",
    //   name: "Kuwait"
    // },
    // {
    //   id: "417",
    //   name: "Kyrgyzstan"
    // },
    // {
    //   id: "418",
    //   name: "Laos"
    // },
    // {
    //   id: "428",
    //   name: "Latvia"
    // },
    // {
    //   id: "422",
    //   name: "Lebanon"
    // },
    // {
    //   id: "426",
    //   name: "Lesotho"
    // },
    // {
    //   id: "430",
    //   name: "Liberia"
    // },
    // {
    //   id: "434",
    //   name: "Libya"
    // },
    // {
    //   id: "440",
    //   name: "Lithuania"
    // },
    // {
    //   id: "442",
    //   name: "Luxembourg"
    // },
    // {
    //   id: "450",
    //   name: "Madagascar"
    // },
    // {
    //   id: "454",
    //   name: "Malawi"
    // },
    // {
    //   id: "458",
    //   name: "Malaysia"
    // },
    // {
    //   id: "462",
    //   name: "Maldives"
    // },
    // {
    //   id: "466",
    //   name: "Mali"
    // },
    // {
    //   id: "470",
    //   name: "Malta"
    // },
    // {
    //   id: "584",
    //   name: "Marshall Isds"
    // },
    // {
    //   id: "474",
    //   name: "Martinique"
    // },
    // {
    //   id: "478",
    //   name: "Mauritania"
    // },
    // {
    //   id: "480",
    //   name: "Mauritius"
    // },
    // {
    //   id: "175",
    //   name: "Mayotte"
    // },
    // {
    //   id: "484",
    //   name: "Mexico"
    // },
    // {
    //   id: "496",
    //   name: "Mongolia"
    // },
    // {
    //   id: "499",
    //   name: "Montenegro"
    // },
    // {
    //   id: "500",
    //   name: "Montserrat"
    // },
    // {
    //   id: "504",
    //   name: "Morocco"
    // },
    // {
    //   id: "508",
    //   name: "Mozambique"
    // },
    // {
    //   id: "104",
    //   name: "Myanmar"
    // },
    // {
    //   id: "580",
    //   name: "N. Mariana Isds"
    // },
    // {
    //   id: "516",
    //   name: "Namibia"
    // },
    // {
    //   id: "524",
    //   name: "Nepal"
    // },
    // {
    //   id: "530",
    //   name: "Neth. Antilles"
    // },
    // {
    //   id: "532",
    //   name: "Neth. Antilles and Aruba"
    // },
    // {
    //   id: "528",
    //   name: "Netherlands"
    // },
    // {
    //   id: "540",
    //   name: "New Caledonia"
    // },
    // {
    //   id: "554",
    //   name: "New Zealand"
    // },
    // {
    //   id: "558",
    //   name: "Nicaragua"
    // }
    // {
    //   id: "562",
    //   name: "Niger"
    // },
    // {
    //   id: "566",
    //   name: "Nigeria"
    // },
    // {
    //   id: "579",
    //   name: "Norway"
    // },
    // {
    //   id: "512",
    //   name: "Oman"
    // },
    // {
    //   id: "490",
    //   name: "Other Asia, nes"
    // },
    // {
    //   id: "586",
    //   name: "Pakistan"
    // },
    // {
    //   id: "585",
    //   name: "Palau"
    // },
    // {
    //   id: "591",
    //   name: "Panama"
    // },
    // {
    //   id: "598",
    //   name: "Papua New Guinea"
    // },
    // {
    //   id: "600",
    //   name: "Paraguay"
    // },
    // {
    //   id: "459",
    //   name: "Peninsula Malaysia"
    // },
    // {
    //   id: "604",
    //   name: "Peru"
    // },
    // {
    //   id: "608",
    //   name: "Philippines"
    // },
    // {
    //   id: "616",
    //   name: "Poland"
    // },
    // {
    //   id: "620",
    //   name: "Portugal"
    // },
    // {
    //   id: "634",
    //   name: "Qatar"
    // },
    // {
    //   id: "410",
    //   name: "Rep. of Korea"
    // },
    // {
    //   id: "498",
    //   name: "Rep. of Moldova"
    // },
    // {
    //   id: "638",
    //   name: "Réunion"
    // },
    // {
    //   id: "642",
    //   name: "Romania"
    // },
    // {
    //   id: "643",
    //   name: "Russia"
    // },
    // {
    //   id: "646",
    //   name: "Rwanda"
    // },
    // {
    //   id: "647",
    //   name: "Ryukyu Isd"
    // },
    // {
    //   id: "461",
    //   name: "Sabah"
    // },
    // {
    //   id: "654",
    //   name: "Saint Helena"
    // },
    // {
    //   id: "659",
    //   name: "Saint Kitts and Nevis"
    // },
    // {
    //   id: "658",
    //   name: "Saint Kitts, Nevis and Anguilla"
    // },
    // {
    //   id: "662",
    //   name: "Saint Lucia"
    // },
    // {
    //   id: "534",
    //   name: "Saint Maarten"
    // },
    // {
    //   id: "666",
    //   name: "Saint Pierre and Miquelon"
    // },
    // {
    //   id: "670",
    //   name: "Saint Vincent and the Grenadines"
    // },
    // {
    //   id: "882",
    //   name: "Samoa"
    // },
    // {
    //   id: "674",
    //   name: "San Marino"
    // },
    // {
    //   id: "678",
    //   name: "Sao Tome and Principe"
    // },
    // {
    //   id: "457",
    //   name: "Sarawak"
    // },
    // {
    //   id: "682",
    //   name: "Saudi Arabia"
    // },
    // {
    //   id: "686",
    //   name: "Senegal"
    // },
    // {
    //   id: "688",
    //   name: "Serbia"
    // },
    // {
    //   id: "891",
    //   name: "Serbia and Montenegro"
    // },
    // {
    //   id: "690",
    //   name: "Seychelles"
    // },
    // {
    //   id: "694",
    //   name: "Sierra Leone"
    // },
    // {
    //   id: "702",
    //   name: "Singapore"
    // },
    // {
    //   id: "703",
    //   name: "Slovakia"
    // },
    // {
    //   id: "705",
    //   name: "Slovenia"
    // },

    // {
    //   id: "90",
    //   name: "Solomon Isds"
    // },
    // {
    //   id: "706",
    //   name: "Somalia"
    // },
    // {
    //   id: "710",
    //   name: "South Africa"
    // },
    // {
    //   id: "728",
    //   name: "South Sudan"
    // },
    // {
    //   id: "724",
    //   name: "Spain"
    // },
    // {
    //   id: "144",
    //   name: "Sri Lanka"
    // },

    // {
    //   id: "729",
    //   name: "Sudan"
    // },
    // {
    //   id: "740",
    //   name: "Suriname"
    // },
    // {
    //   id: "748",
    //   name: "Swaziland"
    // },
    // {
    //   id: "752",
    //   name: "Sweden"
    // },
    // {
    //   id: "757",
    //   name: "Switzerland"
    // },
    // {
    //   id: "760",
    //   name: "Syria"
    // },
    // {
    //   id: "762",
    //   name: "Tajikistan"
    // },
    // {
    //   id: "807",
    //   name: "Macedonia"
    // },
    // {
    //   id: "764",
    //   name: "Thailand"
    // },
    // {
    //   id: "626",
    //   name: "Timor-Leste"
    // },
    // {
    //   id: "768",
    //   name: "Togo"
    // },
    // {
    //   id: "772",
    //   name: "Tokelau"
    // },
    // {
    //   id: "776",
    //   name: "Tonga"
    // },
    // {
    //   id: "780",
    //   name: "Trinidad and Tobago"
    // },
    // {
    //   id: "788",
    //   name: "Tunisia"
    // },
    // {
    //   id: "792",
    //   name: "Turkey"
    // },
    // {
    //   id: "795",
    //   name: "Turkmenistan"
    // },
    // {
    //   id: "796",
    //   name: "Turks and Caicos Isds"
    // },
    // {
    //   id: "798",
    //   name: "Tuvalu"
    // },
    // {
    //   id: "800",
    //   name: "Uganda"
    // },
    // {
    //   id: "804",
    //   name: "Ukraine"
    // },
    // {
    //   id: "784",
    //   name: "United Arab Emirates"
    // },
    // {
    //   id: "826",
    //   name: "United Kingdom"
    // },
    // {
    //   id: "834",
    //   name: "Tanzania"
    // },
    // {
    //   id: "858",
    //   name: "Uruguay"
    // },
    // {
    //   id: "850",
    //   name: "US Virgin Isds"
    // },
    // {
    //   id: "842",
    //   name: "USA"
    // },

    // {
    //   id: "860",
    //   name: "Uzbekistan"
    // },
    // {
    //   id: "548",
    //   name: "Vanuatu"
    // },
    // {
    //   id: "862",
    //   name: "Venezuela"
    // },
    // {
    //   id: "704",
    //   name: "Vietnam"
    // },
    // {
    //   id: "876",
    //   name: "Wallis and Futuna Isds"
    // },
    // {
    //   id: "887",
    //   name: "Yemen"
    // },
    // {
    //   id: "894",
    //   name: "Zambia"
    // },
    // {
    //   id: "716",
    //   name: "Zimbabwe"
    // }
  ];
  console.log("Fetching data for all countries");
  let promises = countries.map(country => {
    return fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${country.name}&q=""`
    )
      .then(response => {
        return response.text();
      })
      .then(body => {
        let results = JSON.parse(body);
        return { country: country.name, id: country.id, total: results.total };
      });
  });
  Promise.all(promises).then(data => {
    console.log("First handler", data);
    response.send(data);
  });
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
