const searchBtn = document.getElementById('search-btn');

function searchAPI() {
    searchBtn.addEventListener('click', function() {
        let city = document.getElementById('search-input').value;
        // let mainCity = document.getElementById('main-city');
        // mainCity.textContent = city;

        const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7f24f20a0a0533ff8f591e0bdf6457c2`;

        fetch(geoURL)
            .then(function(response) {
                return response.json();
            })

            .then(function(geoResults) {
                console.log(geoResults);
                let lat = geoResults[0].lat;
                let lon = geoResults[0].lon;

                const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7f24f20a0a0533ff8f591e0bdf6457c2`;

                fetch(weatherURL)
                    .then(function(response) {
                        return response.json();
                    })

                    .then(function(weatherResults) {
                        console.log(weatherResults);

                        let dateData = dayjs(weatherResults.list[0].dt_txt.split(' ')[0]).format('M/DD/YYYY');
                        let tempDataK = weatherResults.list[0].main.temp;
                        let tempDataF = (((tempDataK - 273.15) * 9/5) + 32).toFixed(2);
                        let windData = weatherResults.list[0].wind.speed;
                        let humData = weatherResults.list[0].main.humidity;

                        let cityInfo = document.getElementById('main-city');
                        let temp = document.getElementById('main-temp');
                        let wind = document.getElementById('main-wind');
                        let hum = document.getElementById('main-hum');

                        cityInfo.textContent = city + ' ' + `(${dateData})`;
                        temp.textContent = `Temp: ${tempDataF} °F`;
                        wind.textContent = `Wind: ${windData} MPH`;
                        hum.textContent = `Humidity: ${humData} %`;
                    })
            })
    })
}

searchAPI();