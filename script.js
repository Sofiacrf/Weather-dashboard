var userFormEl = document.querySelector('#user-form');
var cityName = document.querySelector('#city');
var displayW = document.querySelector('#weather-container');
var displayDays = document.querySelector('#five-day-forecast');
var showingWeather = document.querySelector("#weather-search"); 
var apiId = '28f368d87ec745030ac7ec673fb2056a';

// Function that get the user input for the city and looks for it
function userSearch (city) {
 var searchBtn = document.querySelector(".searchBtn");
 searchBtn.addEventListener("click", function(e){
   e.preventDefault();
console.log("button was clicked");
   var city = cityName.value.trim()
   getCurrentW(city);
  //  getFiveDays(city);

 })



    // var city = cityName.value.trim();


    // if(city) {
    //     // call the function that does the fetch
    //     getCurrentW(city);
    //     getFiveDaysW(location);

    //     displayW.textContent= '';
    //     cityName.value = '';
    // } else {
    //     userFormEl.textContent = 'Please enter a valid city';
    // }
};

// Create a function called showWeather that would display the weather and the five days forecast
// function showWeather(city, data) {
//   getCurrentW(city, data.current);
//   getFiveDaysW(data.daily)
// }

// Function that gets the current weather based in the chosen city
var getCurrentW = function(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiId + '&units=imperial';
    console.log(apiUrl);

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return (response.json());
        } else {
        alert('Error: ' + response.statusText);
      }
      console.log(response.json());
})
.then(data => {
  var weather = data;
  var long = data.coord.lon;
  var lat = data.coord.lat;

  fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&long=${long}&appid=${apiId}`)
  .then(function (response) {
    if (response.ok) {
      return (response.json());
      } else {
      alert('Error: ' + response.statusText);
    }
    console.log(response.json());
})
// .then(data => {
//   handleAddingResponseToHtml add the data to the HTML
// })
})
}


// Function that get the five days weather forecast
// var getFiveDays = function (location) {
//   console.log(location);
//   var {lat} = location;
//   var {lon} = location;
//   var city = location.name;
//   var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid={28f368d87ec745030ac7ec673fb2056a}`;
//     // 'https://api.openweathermap.org/data/2.5/forecast?q=' + forecast + '&appid=' + '28f368d87ec745030ac7ec673fb2056a';
//     console.log(apiUrl, "five days forecast");
//     fetch(apiUrl)
//     .then(function (response){
//       return response.json();
//     })
//     .then(function (data){
//       showWeather(city, data);
//     })
//     .catch(function(error) {
//       console.log(error);
//     })
//   }
    



// On click event listener
// userFormEl.addEventListener('submit', formSubmitCity);
