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

// Function that does the get weather fetch
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
        handleAddingResponseToHtml(data.temp)
      });
    } else {
      alert("Error" + response.statusText);
    }
  });
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
    
}
// Add event listener Function
searchBtn.addEventListener("click", buttonClickerHandler);
