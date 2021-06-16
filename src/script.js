///// THIS IS THE DATES
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let dates = date.getDate();
  let year = date.getFullYear();
  let formattedDate = `${day},  ${dates} ${month} ${year}`;
  return formattedDate;
}
let todayDate = document.querySelector("#date");
todayDate.innerHTML = formatDate(new Date());

///// THIS IS THE HOURS

function formatHour(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedHour = ` Now ${hour} : ${minutes}`;
  return formattedHour;
}

let todayHour = document.querySelector("#time");
todayHour.innerHTML = formatHour(new Date());

///// FORECAST DATE

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
         src="src/icons/${forecastDay.weather[0].icon}.svg" width="60%"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.ceil(
            forecastDay.temp.max
          )}° |</span>
          <span class="weather-forecast-temperature-min"> ${Math.floor(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a7fd79270b4dc9b63d86b5a0f0fb9bcd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

///// WEATHER INFORMATION
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayWeather(response) {
  celciusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = `${response.data.name},`;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#max").innerHTML = Math.ceil(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.floor(
    response.data.main.temp_min
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )} %`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )} °`;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `src/icons/${response.data.weather[0].icon}.svg`
  );
   getForecast(response.data.coord);
}

/////SEARCH CITY

function currentCity(city) {
  let apiKey = "a7fd79270b4dc9b63d86b5a0f0fb9bcd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  currentCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a7fd79270b4dc9b63d86b5a0f0fb9bcd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

///// THIS IS UNITS

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}
let tempCelsius = document.querySelector("#celsius-link");
let tempFahrenheit = document.querySelector("#fahrenheit-link");

tempCelsius.addEventListener("click", convertToCelsius);
tempFahrenheit.addEventListener("click", convertToFahrenheit);

let celciusTemperature = null;


///// Bonus
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-position-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

currentCity("Alkmaar");
