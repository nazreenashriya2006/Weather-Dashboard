async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("weatherResult");

    if (!city) {
        result.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {
        // Get coordinates from city name
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "<p>City not found.</p>";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // Get weather
       const weatherResponse = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
);
        );

        const weatherData = await weatherResponse.json();

        result.innerHTML = `
            <h3>${city}</h3>
            <p>🌡 Temperature: ${weatherData.current.temperature_2m} °C</p>
            <p>💨 Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
        `;
    } catch (error) {
        result.innerHTML = "<p>Error fetching weather data.</p>";
    }
}
