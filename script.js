var userFormEl = document.querySelector("#user-form");
var cityName = document.querySelector("#city");
var displayW = document.querySelector("#weather-container");
var displayDays = document.querySelector("#five-day-forecast");
var showingWeather = document.querySelector("#weather-search");
var apiId = "28f368d87ec745030ac7ec673fb2056a";
var searchBtn = document.querySelector(".searchBtn");

// Add event listener function to start unload the data
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  getCurrentW(city);
});

// Function that gets the current weather based in the chosen city
function getCurrentW(city) {
  city = document.getElementById("city").value.trim();

  //Fetch the api to get the weather of selected city
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiId +
    "&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then((data) => {
      // Create variables for the data needed
      var long = data.coord.lon;
      var lat = data.coord.lat;

      var temp = document.createElement("div");
      temp.innerHTML = data.main.temp;
      var wind = document.createElement("div");
      wind.innerHTML = data.wind.speed;
      var humidity = document.createElement("div");
      humidity.innerHTML = data.main.humidity;

      // Append the elements on HTML in order to display it on the website
      displayW.append(city);
      displayW.append("Tempeture: ", temp, "°F");
      displayW.append("Wind: ", wind, "MPH");
      displayW.append("Humidity: ", humidity, "%");

      // Fetch to get the UVI Index information of the selected city
      fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${apiId}`
      )
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            alert("Error: " + response.statusText);
          }
        })
        .then((data) => {
          //Append the elements on HTML in order to display it on the website
          var uvIndex = document.createElement("div");
          uvIndex.innerHTML = data.value;

          displayW.append("UV Index: ", uvIndex);
        });

      //Fetch the forecast api
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly&appid=${apiId}`
      )
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          //Create the variables that will show the forecast

            for (var i = 0; i < 5; i++) {

              var forecastTemp = document.createElement("div");
              forecastTemp.setAttribute("class", "col l10 s12");
              forecastTemp.innerHTML = data.list[i].main.temp;
  
              var forecastWind = document.createElement("div");
              forecastWind.innerHTML = data.list[i].wind.speed;
  
              var forecastHum = document.createElement("div");
              forecastHum.innerHTML = data.list[i].main.humidity;
  
              displayDays.append("Temp: ", forecastTemp, "°F");
              displayDays.append("Wind: ", forecastWind, "MPH");
              displayDays.append("Humidity", forecastHum, "%");

                     //  To get the icon
          var icon = data.list[0].weather[0].icon;
          var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          // console.log(iconUrl);
          var displayIcon = document.createElement("div");
          displayIcon.innerHTML = iconUrl;
          displayIcon.append(icon);
          }
          

          for (var i = 0; i < 5; i++) {
            //  To get the date without the time
            var longDate = data.list[i].dt;
            var shortDate = longDate * 1000;
            var newDate = new Date(shortDate);
            var newDatestring = newDate.toLocaleDateString();
            console.log(newDatestring);
          }
        });
    });
}

// Save on local storage
