async function getWeather(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=804410e94f767b4191c38952a23bb3f6&units=metric`, { mode: "cors" });
  const json = await response.json();
  return json;
}

function makeWeatherObject(data) {
  const weather = {};
  weather.location = data.name;
  weather.country = data.sys.country;
  weather.weather = data.weather[0].main;
  weather.description = data.weather[0].description;
  weather.tempC = data.main.temp;
  weather.tempF = Math.round((weather.tempC * (5 / 9) + 32));
  weather.feelsC = data.main.feels_like;
  weather.feelsF = Math.round((weather.feelsC * (5 / 9) + 32));
  weather.humidity = data.main.humidity;
  weather.windSpeed = data.wind.speed;
  weather.windDirection = data.wind.deg;
  return weather;
}

async function search() {
  const form = document.querySelector("form");
  const search = document.querySelector("input");
  form.addEventListener("submit", async () => {
    event.preventDefault();
    const loading = document.querySelector(".loading");
    loading.classList.remove("hide");
    const location = search.value;
    search.value = "";
    try {
      const data = await getWeather(location);
      const weather = await makeWeatherObject(data);
      clearDiv();
      displayWeather(weather);
      loading.classList.add("hide");
    } catch (err) {
      console.log(err);
      alert(`${location} is not a valid location!`);
      loading.classList.add("hide");
    }
  });
}

function displayWeather(weather) {
  const weatherDiv = document.querySelector(".weather");
  const btn = document.querySelector(".toggle");
  const location = document.createElement("h1");
  const country = document.createElement("h2");
  const icon = document.createElement("img");
  const weatherText = document.createElement("strong");
  const description = document.createElement("em");
  const temperature = document.createElement("strong");
  const humidity = document.createElement("p");
  const wind = document.createElement("p");
  icon.classList.add("icon");
  weatherText.classList.add("weather-text");
  description.classList.add("description");
  temperature.classList.add("temperature");
  humidity.classList.add("humidity");
  wind.classList.add("wind");
  location.textContent = weather.location;
  country.textContent = weather.country;
  weatherText.textContent = weather.weather;
  description.textContent = weather.description;
  temperature.textContent = `Temperature: ${weather.tempC}°C Feels Like: ${weather.feelsC}°C`;
  humidity.textContent = `Humidity: ${weather.humidity}%`;
  wind.textContent = `Wind Speed: ${weather.windSpeed}m/s Wind Direction: ${weather.windDirection}°`;
  weatherDiv.insertBefore(location, btn);
  weatherDiv.insertBefore(country, btn);
  weatherDiv.insertBefore(icon, btn);
  weatherDiv.insertBefore(weatherText, btn);
  weatherDiv.insertBefore(description, btn);
  weatherDiv.insertBefore(temperature, btn);
  weatherDiv.insertBefore(humidity, btn);
  weatherDiv.insertBefore(wind, btn);

  if (weather.weather === "Clouds") {
    icon.src = "images/cloudy.png";
  } else if (weather.weather === "Clear") {
    icon.src = "images/clear-sky.png";
  } else if (weather.weather === "Thunderstorm") {
    icon.src = "images/storm.png";
  } else if (weather.weather === "Drizzle") {
    icon.src = "images/drizzle.png";
  } else if (weather.weather === "Rain") {
    icon.src = "images/rainy.png";
  } else if (weather.weather === "Snow") {
    icon.src = "images/snowflake.png";
  } else if (weather.weather === "Atmosphere" || weather.weather === "Mist") {
    icon.src = "images/fog.png";
  }
  let tempFormat = "C";
  btn.addEventListener("click", () => {
    if (tempFormat === "C") {
      temperature.textContent = `Temperature: ${weather.tempF}°F Feels Like: ${weather.feelsF}°F`;
      tempFormat = "F";
    } else {
      temperature.textContent = `Temperature: ${weather.tempC}°C Feels Like: ${weather.feelsC}°C`;
      tempFormat = "C";
    }
  });
}

function clearDiv() {
  const weatherDiv = document.querySelector(".weather");
  for (const child of Array.from(weatherDiv.children)) {
    if ((!child.classList.contains("form"))
    && (!child.classList.contains("toggle"))
    && (!child.classList.contains("loading"))) {
      weatherDiv.removeChild(child);
    }
  }
}
async function pageLoad() {
  const json = await getWeather("london");
  const weather = await makeWeatherObject(json);
  displayWeather(weather);
}

search();
pageLoad();
