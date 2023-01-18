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
  weather.feels = data.main.feels_like;
  weather.humidity = data.main.humidity;
  weather.windSpeed = data.wind.speed;
  weather.windDirection = data.wind.deg;
  console.log(weather);
  return weather;
}

function search() {
  const form = document.querySelector("form");
  const search = document.querySelector("input");
  form.addEventListener("submit", async () => {
    event.preventDefault();
    const location = search.value;
    search.value = "";
    try {
      const data = await getWeather(location);
      const weather = makeWeatherObject(data);
    } catch (err) {
      console.log(err);
      alert(`${location} is not a valid location!`);
    }
  });
}

search();
