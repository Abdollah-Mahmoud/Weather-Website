const inputField = document.getElementById("cityInput");
const regionElement = document.getElementById("region");
const tempElement = document.getElementById("temp");
const conditionElement = document.getElementById("condition");
const uvElement = document.getElementById("uv");
const windSpeedElement = document.getElementById("windSpeed");
const windDirectionElement = document.getElementById("windDirection");
const date1Element = document.getElementById("date1");
const date2Element = document.getElementById("date2");
const date3Element = document.getElementById("date3");
const max1Element = document.getElementById("max1");
const max2Element = document.getElementById("max2");
const min2Element = document.getElementById("min2");
const min1Element = document.getElementById("min1");
const condition2Element = document.getElementById("condition2");
const condition3Element = document.getElementById("condition3");
const uvIconElement = document.getElementById("uvIcon");

async function getWeatherData(location) {
  const url =
    "https://api.weatherapi.com/v1/forecast.json?key=11eee77bdc5745b1822131712241112&days=3&q=" +
    location;
  try {
    return new Promise(function (resolved, rejected) {
      let myHttp = new XMLHttpRequest();
      myHttp.open("GET", url);
      myHttp.send();
      myHttp.responseType = "json";

      myHttp.addEventListener("load", function () {
        if (myHttp.status >= 200 && myHttp.status < 3000) {
          console.log("WeatherData", myHttp.response);
          regionElement.textContent = myHttp.response.location.name;
          tempElement.textContent = myHttp.response.current.temp_c + " °c";
          conditionElement.textContent = myHttp.response.current.condition.text;
          uvElement.textContent = "  " + myHttp.response.current.uv + " %";
          windSpeedElement.textContent =
            "  " + myHttp.response.current.wind_kph + " km/h";
          windDirectionElement.textContent =
            "  " + myHttp.response.current.wind_dir;
          date1Element.textContent =
            "  " + myHttp.response.forecast.forecastday[0].date;
          date2Element.textContent =
            "  " + myHttp.response.forecast.forecastday[1].date;
          date3Element.textContent =
            "  " + myHttp.response.forecast.forecastday[2].date;
          max1Element.textContent =
            myHttp.response.forecast.forecastday[1].day.maxtemp_c + " °c";
          min1Element.textContent =
            myHttp.response.forecast.forecastday[1].day.mintemp_c + " °c";
          max2Element.textContent =
            myHttp.response.forecast.forecastday[2].day.maxtemp_c + " °c";
          min2Element.textContent =
            myHttp.response.forecast.forecastday[2].day.maxtemp_c + " °c";
          condition2Element.textContent =
            myHttp.response.forecast.forecastday[1].day.condition.text;
          condition3Element.textContent =
            myHttp.response.forecast.forecastday[2].day.condition.text;

          if (myHttp.response.forecast.forecastday[1].day.uv <= 1)
            uvIconElement.innerHTML =
              '<i class="fa-regular fa-moon icon-card2"></i>';
          else
            uvIconElement.innerHTML =
              '<i class="fa-regular fa-sun icon-card2"></i>';

          resolved();
        }
      });
      myHttp.addEventListener("error", function () {
        rejected("error WeatherData");
      });
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

const city = "cairo";
getWeatherData(city);

function handleInput(event) {
  getWeatherData(event.target.value);
}

inputField.addEventListener("input", handleInput);
