// const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7f24f20a0a0533ff8f591e0bdf6457c2`;


let city = 'Nashville';

const geoURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7f24f20a0a0533ff8f591e0bdf6457c2`;

function searchAPI() {
    fetch(geoURL)
        .then(function(response) {
            return response.json();
        })

        .then(function(geoResults) {
            console.log(geoResults);
        })
}

searchAPI();