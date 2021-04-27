var userFormEl = document.querySelector('#user-form');
var cityName = document.querySelector('#city');
var displayW = document.querySelector('#weather-container');
var displayDays = document.querySelector('#five-day-forecast');
var showingWeather = document.querySelector("#weather-search"); 
var apiId = '28f368d87ec745030ac7ec673fb2056a';
var searchBtn = document.querySelector(".searchBtn");

// Function that get the user input for the city and looks for it
searchBtn.addEventListener("click", function (e){
  e.preventDefault();

  getCurrentW(city);
})

// Create a function called showWeather that would display the weather and the five days forecast
// function showWeather(city, data) {
//   saveSelectedCity.textContent = displayW;
//   getCurrentW(city, data.current);
//   getFiveDaysW(data.daily)
// }

// Function that gets the current weather based in the chosen city
function getCurrentW (city) {
  city = document.getElementById("city").value.trim();

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiId + '&units=imperial';

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return (response.json());
        } else {
        alert('Error: ' + response.statusText);
      }
}).then(data => {
  console.log(data);
  console.log(data.name, data.main.temp, "Farenheit");
  var long = data.coord.lon;
  var lat = data.coord.lat;
  
  var temp = document.createElement("div");
  temp.innerHTML=data.main.temp;
  var wind = document.createElement("div");
  wind.innerHTML=data.wind.speed;
  var humidity = document.createElement("div");
  humidity.innerHTML = data.main.humidity;

// Dislay the weather
  displayW.append("Tempeture: ", temp);
  displayW.append("Wind: ", wind);
  displayW.append("Humidity: ", humidity);
  

  fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${apiId}`)
  .then(function (response) {
    if (response.ok) {
      return (response.json());
      } else {
      alert('Error: ' + response.statusText);
    }
})
.then(data => {
  console.log(data);
})
})
}


// Function that get the five days weather forecast
var getFiveDays = function (location) {
  console.log(location);
  var {lat} = location;
  var {lon} = location;
  var city = location.name;
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid={28f368d87ec745030ac7ec673fb2056a}`;
  
    console.log(apiUrl, "five days forecast");
    fetch(apiUrl)
    .then(function (response){
      return response.json();
    })
    .then(function (data){
      showWeather(city, data);
    })
    .catch(function(error) {
      console.log(error);
    })
  }
    

// On click event listener
// userFormEl.addEventListener('submit', formSubmitCity);
// searchBtn.addEventListener('click', buttonClickerHandler);