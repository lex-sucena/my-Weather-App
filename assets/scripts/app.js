function getWeather() {
  let apiKey = "gjaRI8fcGcsgrJ6aO0oO5Q==NbyX2m2krrsB44fP";
  let city = "london";

  let str = `https://api.api-ninjas.com/v1/weather?city=${city}`;
  let url = new URL(str);
  let sp = url.searchParams;
  sp.append("api-key", "");

  let h = new Headers();
  h.append("content-type", "application/json");
  h.append("x-api-key", `${apiKey}`);
  h.append("Authorization", `Bearer ${apiKey}`);

  let request = new Request(url, {
    method: "GET",
    headers: h,
    cache: "default",
    credentials: "same-origin",
  });

  fetch(request)
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      return response.text();
    })
    .then((txt) => {
      console.log(txt);
    })
    .catch(console.warn);
}
function getLocation() {
  const apiKey = "0a6426e1acd04e679d285400a2ec3229";
  let query = "Goiânia";

  const url = new URL("https://api.opencagedata.com/geocode/v1/json");
  const requestUrl =
    url +
    "?" +
    `key=${apiKey}` +
    `&q=${encodeURIComponent(query)}` +
    "&pretty=1" +
    "&no_annotations=1";
  let request = new Request(requestUrl);
  fetch(request)
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      return response.text();
    })
    .then((txt) => {
      console.log(txt);
    })
    .catch(console.warn);
}
getLocation();
