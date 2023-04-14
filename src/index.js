//Current day

let now = new Date();
let currentDate = document.querySelector("#current-date");

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

let today = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let day = days[now.getDay()];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${month} ${today}. ${hours}:${minutes}`;
setInterval(function () {
  window.location.reload();
}, 300000);

//Search bar

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    alert("Type something");
  }
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=${searchInput.value}&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
  booleF = true;
  booleC = false;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Units conversion

let temperature = document.querySelector("#current-temp-number");
let ceLink = document.querySelector("#celsius");
let faLink = document.querySelector("#fahrenheit");
let maxTemp = document.querySelector("#max-temp");
let minTemp = document.querySelector("#min-temp");
let feeling = document.querySelector("#realfeel");
let booleF = true;
let booleC = false;

function convertF(event) {
  event.preventDefault();
  let celsius = parseFloat(temperature.innerHTML);
  if (!isNaN(celsius)) {
    let fahrenheit = (celsius * 9) / 5 + 32;
    if (booleF) {
      temperature.innerHTML = Math.round(fahrenheit);
    }
  }

  celsius = parseFloat(maxTemp.innerHTML);
  if (!isNaN(celsius)) {
    let fahrenheit = (celsius * 9) / 5 + 32;
    let maxTempData = Math.round(fahrenheit);
    if (booleF) {
      maxTemp.innerHTML = `${maxTempData}°`;
    }
  }

  celsius = parseFloat(minTemp.innerHTML);
  if (!isNaN(celsius)) {
    let fahrenheit = (celsius * 9) / 5 + 32;
    let minTempData = Math.round(fahrenheit);
    if (booleF) {
      minTemp.innerHTML = `${minTempData}°`;
    }
  }

  celsius = parseFloat(realfeel.innerHTML);
  if (!isNaN(celsius)) {
    let fahrenheit = (celsius * 9) / 5 + 32;
    let realfeel = Math.round(fahrenheit);
    if (booleF) {
      feeling.innerHTML = `${realfeel}`;
    }
  }
  booleF = false;
  booleC = true;
  faLink.classList.remove("active");
  ceLink.classList.add("active");
}

function convertC(event) {
  event.preventDefault();
  let fahrenheit = parseFloat(temperature.innerHTML);
  if (!isNaN(fahrenheit)) {
    let celsius = ((fahrenheit - 32) * 5) / 9;
    if (booleC) {
      temperature.innerHTML = Math.round(celsius);
    }
  }

  fahrenheit = parseFloat(maxTemp.innerHTML);
  if (!isNaN(fahrenheit)) {
    let celsius = ((fahrenheit - 32) * 5) / 9;
    let maxTempData = Math.round(celsius);
    if (booleC) {
      maxTemp.innerHTML = `${maxTempData}°`;
    }
  }

  fahrenheit = parseFloat(minTemp.innerHTML);
  if (!isNaN(fahrenheit)) {
    let celsius = ((fahrenheit - 32) * 5) / 9;
    let minTempData = Math.round(celsius);
    if (booleC) {
      minTemp.innerHTML = `${minTempData}°`;
    }
  }

  fahrenheit = parseFloat(feeling.innerHTML);
  if (!isNaN(fahrenheit)) {
    let celsius = ((fahrenheit - 32) * 5) / 9;
    let realfeel = Math.round(celsius);
    if (booleC) {
      feeling.innerHTML = `${realfeel}`;
    }
  }
  booleF = true;
  booleC = false;
  faLink.classList.add("active");
  ceLink.classList.remove("active");
}

faLink.addEventListener("click", convertF);
ceLink.addEventListener("click", convertC);

//Weather icon

let iconEmojis = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "⛅️",
  "02n": "☁️🌙",
  "03d": "🌥",
  "03n": "🌥",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧",
  "09n": "🌧",
  "10d": "🌦",
  "10n": "🌧🌙",
  "11d": "⛈",
  "11n": "⛈",
  "13d": "🌨",
  "13n": "🌨",
  "50d": "🌫",
  "50n": "🌫",
};

//Current temperature

function showCurrentTemp(response) {
  let temperatureData = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = `${temperatureData}`;
  let maxTemp = document.querySelector("#max-temp");
  let maxTempData = Math.round(response.data.main.temp_max);
  maxTemp.innerHTML = `${maxTempData}°`;
  let minTemp = document.querySelector("#min-temp");
  let minTempData = Math.round(response.data.main.temp_min);
  minTemp.innerHTML = `${minTempData}°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let winds = document.querySelector("#winds");
  winds.innerHTML = `${response.data.wind.speed}`;
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `${response.data.clouds.all}`;
  let main = document.querySelector("#weather");
  main.innerHTML = `${response.data.weather[0].main}`;
  let realfeel = Math.round(response.data.main.feels_like);
  let feeling = document.querySelector("#realfeel");
  feeling.innerHTML = `${realfeel}`;
  let description = document.querySelector("#weather-alert");
  description.innerHTML = `${response.data.weather[0].description}`;
  let icon = document.querySelector("#icon");
  let iconEmoji = iconEmojis[response.data.weather[0].icon];
  icon.innerHTML = `${iconEmoji}`;
  booleF = true;
  booleC = false;
}

//Current weather

function showWeather(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${response.data.name}`;
  let localTemp = document.querySelector("#current-temp-number");
  let temperatureData = Math.round(response.data.main.temp);
  localTemp.innerHTML = `${temperatureData}`;
  let maxTemp = document.querySelector("#max-temp");
  let maxTempData = Math.round(response.data.main.temp_max);
  maxTemp.innerHTML = `${maxTempData}°`;
  let minTemp = document.querySelector("#min-temp");
  let minTempData = Math.round(response.data.main.temp_min);
  minTemp.innerHTML = `${minTempData}°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let winds = document.querySelector("#winds");
  winds.innerHTML = `${response.data.wind.speed}`;
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `${response.data.clouds.all}`;
  let main = document.querySelector("#weather");
  main.innerHTML = `${response.data.weather[0].main}`;
  let realfeel = Math.round(response.data.main.feels_like);
  let feeling = document.querySelector("#realfeel");
  feeling.innerHTML = `${realfeel}`;
  let description = document.querySelector("#weather-alert");
  description.innerHTML = `${response.data.weather[0].description}`;
  let icon = document.querySelector("#icon");
  let iconEmoji = iconEmojis[response.data.weather[0].icon];
  icon.innerHTML = `${iconEmoji}`;
  booleF = true;
  booleC = false;
}

function retrievePosition(position) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

//Popular cities
function getNewYork(response) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=New%20York&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
  let nyCity = document.querySelector("#city");
  nyCity.innerHTML = `${"New York"}`;
  booleF = true;
  booleC = false;
}
let buttonNY = document.querySelector("#new-york");
buttonNY.addEventListener("click", getNewYork);

function getParis(response) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=Paris&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
  let parisCity = document.querySelector("#city");
  parisCity.innerHTML = `${"Paris"}`;
  booleF = true;
  booleC = false;
}
let buttonParis = document.querySelector("#paris");
buttonParis.addEventListener("click", getParis);

function getToronto(response) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=Toronto&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
  let torontoCity = document.querySelector("#city");
  torontoCity.innerHTML = `${"Toronto"}`;
  booleF = true;
  booleC = false;
}
let buttonToronto = document.querySelector("#toronto");
buttonToronto.addEventListener("click", getToronto);

function getTokyo(response) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=Tokyo&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
  let tokyoCity = document.querySelector("#city");
  tokyoCity.innerHTML = `${"Tokyo"}`;
  booleF = true;
  booleC = false;
}
let buttonTokyo = document.querySelector("#tokyo");
buttonTokyo.addEventListener("click", getTokyo);

function getLima(response) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  axios
    .get(`${apiUrl}q=Lima&appid=${apiKey}&units=${units}`)
    .then(showCurrentTemp);
  let limaCity = document.querySelector("#city");
  limaCity.innerHTML = `${"Lima"}`;
  booleF = true;
  booleC = false;
}
let buttonLima = document.querySelector("#lima");
buttonLima.addEventListener("click", getLima);
