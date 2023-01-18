async function getWeather(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=804410e94f767b4191c38952a23bb3f6`, { mode: "cors" });
  const json = await response.json();
  console.log(json);
  return json;
}

getWeather("London");
