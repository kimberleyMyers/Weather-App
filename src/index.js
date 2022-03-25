//API Key//
//let apiKey = "9aa82c7a2ca2c85649f87bb4fc22205a";
//let apiUrl =
//"https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=9aa82c7a2ca2c85649f87bb4fc22205a&units=metric";//

//Days, date, time//

let now = new Date();
let daytime = document.querySelector(".daytimes");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
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
let month = months[now.getMonth()];

daytime.innerHTML = `${day} ${month} ${date}, ${year} <br/> ${hours}:${minutes}`;

console.log(Date(now));

//City Search//

function search(city) {
  let apiKey = "9aa82c7a2ca2c85649f87bb4fc22205a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(Temperature);
}

function Search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let searchElement = document.querySelector(".city");
  searchElement.innerHTML = `${searchInput.value}`;

  console.log(searchInput.value);
}
let form = document.querySelector(".forms");
form.addEventListener("submit", Search);

//Temperature//
function Temperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let tempElement = document.querySelector(".city");
  tempElement.innerHTML = `${city} <br/> ${temperature}°C <br/> <br/> ${day} ${month} ${date}, ${year} <br/> ${hours}:${minutes}`;
}

let apiKey = "9aa82c7a2ca2c85649f87bb4fc22205a";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=$ColoradoSprings&appid=9aa82c7a2ca2c85649f87bb4fc22205a&units=metric";

let city = "Colorado Springs";

axios.get(apiUrl).then(Temperature);

//GeoLocation//

function currentLocation(position) {
  let Latitude = position.coords.latitude;
  let Longitude = position.coords.longitude;
  console.log(Latitude);
  console.log(Longitude);
  let apiKey = "9aa82c7a2ca2c85649f87bb4fc22205a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(Temperature);
}
navigator.geolocation.getCurrentPosition(currentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let forms = document.querySelector("#currentloc");
form.addEventListener("submit", daytime);
form.addEventListener("submit", search);

let currentLocationButtom = document.querySelector("#currentloc");
currentLocationButtom.addEventListener("click", getCurrentLocation);
