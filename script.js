var userFormEl = document.querySelector("#user-form");
var cityName = document.querySelector("#city");
var displayW = document.querySelector("#weather-container");
var displayTemp = document.querySelector("#display-temp");
var displayDays = document.querySelector("#five-day-forecast");
var showingWeather = document.querySelector("#weather-search");
var apiId = "28f368d87ec745030ac7ec673fb2056a";
var searchBtn = document.querySelector(".searchBtn");
var historyList = document.querySelector(".historyList");

// Add event listener function to start onload the data
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  getCurrentW(city);
});

// Function that gets the current weather based in the chosen city
function getCurrentW(city) {
  city = document.getElementById("city").value.trim();

  //Function that creates a button based on the selected city
  var cityBtn = document.createElement("button");
  cityBtn.setAttribute("class", "btn btn-outline-secondary btn-block");
  cityBtn.setAttribute("data-value", city);
  cityBtn.textContent = city;
  // Append to the list
  historyList.append(cityBtn);
  console.log(cityBtn);

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
      var city = document.createElement("h4");
      city.innerHTML = data.name + " ";
      var temp = document.createElement("li");
      temp.innerHTML = data.main.temp + " °F";
      var wind = document.createElement("li");
      wind.innerHTML = data.wind.speed + " MPH";
      var humidity = document.createElement("li");
      humidity.innerHTML = data.main.humidity + " %";

      //Setting the classes for each element
      displayW.setAttribute("class", "card w-100 mx-3"); // div
      displayTemp.setAttribute("class", "list-group-flush"); // ul
      temp.setAttribute(
        "class",
        "list-group-item-info border-0  text-white size10"
      ); // li
      wind.setAttribute(
        "class",
        "list-group-item-info border-0  text-white size10"
      ); // li
      humidity.setAttribute(
        "class",
        "list-group-item-info border-0  text-white size10"
      ); //li

      // Append the elements on HTML in order to display it on the website
      displayTemp.append(city);
      displayTemp.append("Temperature: ", temp);
      displayTemp.append("Wind: ", wind);
      displayTemp.append("Humidity: ", humidity);
      displayW.append(displayTemp);

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
          var uvIndex = document.createElement("li");
          uvIndex.innerHTML = "UV Index: " + data.value + "%";
          uvIndex
          console.log(uvIndex);

          // Set the class of the UV Index
          // var uvIndex = data.value;
          // var uvConLow = low;
          // var uvConMod = moderate;
          // var uvConHigh = high;
          // var uvConVeryHigh = veryHigh;
          // var uvConExt = extreme;

          if (uvIndex > 0 && uvIndex < 3) {
            uvIndex.data.value.setAttribute("class", "low");
          } else if (uvIndex >= 3 && uvIndex < 6) {
            uvIndex.setAttribute("class", "moderate");
          } else if (uvIndex >=6 && uvIndex < 8) {
            uvIndex.setAttribute("class", "high");
          } else if (uvIndex >=8 && uvIndex < 11) {
            uvIndex.setAttribute("class", "veryHigh");
          } else {
            uvIndex.setAttribute("class", "extreme");
          }

          displayTemp.append(uvIndex);
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
            var forecastTemp = document.createElement("li");
            forecastTemp.setAttribute("class", "col l10 s12");
            forecastTemp.innerHTML = data.list[i].main.temp;

            var forecastWind = document.createElement("li");
            forecastWind.innerHTML = data.list[i].wind.speed;

            var forecastHum = document.createElement("li");
            forecastHum.innerHTML = data.list[i].main.humidity;

            displayDays.append("Temp: ", forecastTemp, "°F");
            displayDays.append("Wind: ", forecastWind, "MPH");
            displayDays.append("Humidity", forecastHum, "%");

            //  To get the icon
            var icon = data.list[0].weather[0].icon;
            var iconUrl =
              "http://openweathermap.org/img/wn/" + icon + "@2x.png";
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
  saveCity();
}

// Save on local storage
var saveCity = function (city) {
  var cityInput = document.querySelector("#city").value;
  var cityHistory = JSON.parse(localStorage.getItem("cities")) || [];
  var isStored = false;

  var cityObject = {
    cityInput: cityInput,
    city: city,
  };

  for (var i = 0; i < cityHistory.length; i++) {
    if (cityHistory[i] === city) {
      isStored = true;
      break;
    }
  }
  if (!isStored) {
    cityHistory.push(cityObject);
    localStorage.setItem("cities", JSON.stringify(cityHistory));
  }
};
