const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "bef7ee7cf7a3f4a44de2938a48c6b7cb";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} <sup>°C</sup>`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "https://cdn-icons-png.flaticon.com/128/5904/5904053.png";
                break;
            case 'Clear':
                weather_img.src = "https://cdn-icons-png.flaticon.com/128/7780/7780231.png";
                break;
            case 'Rain':
                weather_img.src = "https://cdn-icons-png.flaticon.com/128/9176/9176545.png";
                break;
            case 'Mist':
                weather_img.src = "https://cdn-icons-png.flaticon.com/128/8691/8691507.png";
                break;
            case 'Snow':
                weather_img.src = "https://cdn-icons-png.flaticon.com/128/2315/2315309.png";
                break;
            default:
                weather_img.src = "https://cdn-icons-png.flaticon.com/128/5904/5904053.png";
        }
    } catch (error) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
