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

let search = document.querySelector("#search-container");
search.addEventListener("submit",submit);

findCity("bushehr");
