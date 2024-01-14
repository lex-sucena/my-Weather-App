function getUserLocation() {
  navigator.geolocation.getCurrentPosition(success, error);
  function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    getUserWeather(lat, long);
  }
  function error() {
    return `No data available`;
  }
}
function getUserWeather(lat, long) {
  let q = `${lat},${long}`;
  let apiKey = `6809f4c609f74ca7b9e190423241401`;
  let str = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}&aqi=no&lang=pt`;
  let url = new URL(str);

  let request = new Request(url);

  fetch(request)
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      return response.text();
    })
    .then((txt) => {
      const response = JSON.parse(txt);
      updateInterface(response);
    })
    .catch(console.warn);
}
function updateInterface(response) {
  const { _location, current } = response;
  const { temp_c, condition, wind_kph, humidity, feelslike_c } = current;
  const { text, icon, _code } = condition;
  const iconCode = icon.substr(39, 45);

  const cityName = document.getElementById("cityName");
  const temp = document.getElementById("temp");
  const condicao = document.getElementById("condition");
  const tempFeels = document.getElementById("tempFeels");
  const windSpeed = document.getElementById("windSpeed");
  const humidade = document.getElementById("humidity");
  const conditionIcon = document.getElementById("conditionIcon");

  cityName.innerText = `${response.location.name}, ${response.location.region}`;
  temp.innerText = `${temp_c}°C`;
  condicao.innerText = text;
  tempFeels.innerText = `${feelslike_c}°C`;
  windSpeed.innerText = `${wind_kph} KM/h`;
  humidade.innerText = `${humidity}%`;
  conditionIcon.src = `https://github.com/lex-sucena/my-Weather-App/blob/main/assets/images/weather-icons/${iconCode}`;
}
window.addEventListener("load", getUserLocation);
