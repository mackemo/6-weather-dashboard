const searchBtn = document.getElementById('search-btn');

function searchAPI() {
    searchBtn.addEventListener('click', function() {
        let city = document.getElementById('search-input').value;

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
                    })
            })
    })
}
    

searchAPI();