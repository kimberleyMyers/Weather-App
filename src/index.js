// JavaScr//API Key//
//let apiKey = "9aa82c7a2ca2c85649f87bb4fc22205a";
//let apiUrl =
//"https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=9aa82c7a2ca2c85649f87bb4fc22205a&units=metric";//

//Days, date, time//

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src=" https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
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
  let apikey = "9aa82c7a2ca2c85649f87bb4fc22205a";
  let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#currenttemp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "9aa82c7a2ca2c85649f87bb4fc22205a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#forms");
form.addEventListener("submit", handleSubmit);

search("Colorado");

//Metrics - Units//

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#currenttemp");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("unit");
  fahrenheitLink.classList.add("unit");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currenttemp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("unit");
  fahrenheitLink.classList.remove("unit");
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#F-units");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#C-units");
celsiusLink.addEventListener("click", showCelsiusTemp);

//GeoLocation//

function CurrentLocation(position) {
  let Latitude = position.coords.latitude;
  let Longitude = position.coords.longitude;
  console.log(Latitude);
  console.log(Longitude);
  let apiKey = "9aa82c7a2ca2c85649f87bb4fc22205a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

navigator.geolocation.getCurrentPosition(CurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(CurrentLocation);
}

let forms = document.querySelector("#currentloc");
form.addEventListener("submit", search);

let CurrentLocationButton = document.querySelector("#currentloc");
CurrentLocationButton.addEventListener("click", getCurrentLocation);
