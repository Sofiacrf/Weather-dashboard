// Set global variables
var userFormEl = document.querySelector("#user-form");
var cityName = document.querySelector("#city");
var displayW = document.querySelector("#weather-container");
var displayDays = document.querySelector("#five-day-forecast");
var showingWeather = document.querySelector("#weather-search");
var apiId = "28f368d87ec745030ac7ec673fb2056a";
var searchBtn = document.querySelector(".searchBtn");

// Function that gets the user input for the city and looks for it
var buttonClickerHandler = function (event) {
  event.preventDefault();

  var city = cityName.value.trim();

  if (city) {
    // call the function that does the fetch
    getWeather(city);
    getForecast(city);

    // display the user selected city
    displayW.textContent = city;
    userFormEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

// Function that fetch the weather
var getWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiId;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        // handleAddingResponseToHtml(data.temp)
      });
    } else {
      alert("Error" + response.statusText);
    }
  });

// parse the data received
 var response = data;
 console.log(response);

};

// Function that does the forecast fetch
var getForecast = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    "28f368d87ec745030ac7ec673fb2056a";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .then(data => {
  handleAddingResponseToHtml()
})
};

// Function that will display the weather
function handleAddingResponseToHtml(city, weather) {
  console.log(apiUrl.data);
}

// Add event listener Function
searchBtn.addEventListener("click", buttonClickerHandler);
// parse the result tratAR la respuesta del API como un string tomar el restulado como un string variable, hacer una function que separa en variables que hace un array, cada segmento del string va a tener su propia variable, weather parentesis 1 sería la primera parte, 