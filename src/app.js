function formatDate(timestemp){
    let date = new Date();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
      }
    let min = date.getMinutes();
    if (min < 10) {
        min = `0${min}`;
      }
    return `${day} ${hour}:${min}`;
}
function getForecast(coordinates){
  let apiKey="618babd8a78c104b6a8d38473t84aefo";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response){
    console.log(response.data);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(response.data.temperature.current);
    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;
    let country = document.querySelector("#country");
    country.innerHTML = response.data.country;
    let lat = document.querySelector("#lat");
    lat.innerHTML = (response.data.coordinates.latitude).toFixed(4);
    let lon = document.querySelector("#lon");
    lon.innerHTML = (response.data.coordinates.longitude).toFixed(4);
    let icon = document.querySelector("#current-weather-img");
    icon.setAttribute("src",response.data.condition.icon_url);
    let date = document.querySelector("#current-date");
    date.innerHTML = formatDate(response.data.time * 1000);
    let description = document.querySelector("#Description");
    description.innerHTML = response.data.condition.description;
    let feel = document.querySelector("#Feels-like");
    feel.innerHTML = Math.round(response.data.temperature.feels_like);
    let wind = document.querySelector("#Wind-Status");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let humidity = document.querySelector("#Humidity");
    humidity.innerHTML = response.data.temperature.humidity;
    let pressure = document.querySelector("#Pressure");
    pressure.innerHTML = response.data.temperature.pressure;
    getForecast(response.data.coordinates);
} 

function findCity(city){
let apiKey= "618babd8a78c104b6a8d38473t84aefo";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayTemp);
}

function submit(event){
    event.preventDefault();
    let input = document.querySelector("#search-box");
    findCity(input.value);
}

function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[day];

}


function displayForecast(response){
let forecastElement = response.data.daily;
console.log(response.data.daily);
let forecast  = document.querySelector("#Forecast");
let forecastHtml =`<div class="row">`;
forecastElement.forEach(function(forecastday){
  forecastHtml=forecastHtml+`
  <div class="col f-card">
  <div id="day">${formatDay(forecastday.time)}</div>
  <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastday.condition.icon}.png" alt="" id="s-icon"/>
  <div>
  <span>${Math.round(forecastday.temperature.maximum)}</span>     

  <span>${Math.round(forecastday.temperature.minimum)}</span>
  </div>
  </div>`;
});
forecastHtml=forecastHtml+`</div>`;
forecast.innerHTML=forecastHtml;
}




let search = document.querySelector("#search-container");
search.addEventListener("submit",submit);

findCity("bushehr");
