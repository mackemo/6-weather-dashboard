//search button
const searchBtn = document.getElementById('search-btn');

//upon search button click, the apis run
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

                        //after fetching weather results, get the info into variables
                        let dateData = dayjs(weatherResults.list[0].dt_txt.split(' ')[0]).format('M/DD/YYYY');
                        let tempDataK = weatherResults.list[0].main.temp;
                        let tempDataF = (((tempDataK - 273.15) * 9/5) + 32).toFixed(2);
                        let windData = weatherResults.list[0].wind.speed;
                        let humData = weatherResults.list[0].main.humidity;

                        let cityInfo = document.getElementById('main-city');
                        let temp = document.getElementById('main-temp');
                        let wind = document.getElementById('main-wind');
                        let hum = document.getElementById('main-hum');

                        //put the info in cooresponding id in html
                        cityInfo.textContent = city + ' ' + `(${dateData})`;
                        temp.textContent = `Temp: ${tempDataF} °F`;
                        wind.textContent = `Wind: ${windData} MPH`;
                        hum.textContent = `Humidity: ${humData} %`;


                        //displays function below (5-day forecast)
                        displayFiveDay(weatherResults);
        
                    })
            })
    })
}

//function for 5-day forecast
function displayFiveDay(weatherResults) {

    //the specific array items with the new day
    let indexes = [2, 8, 16, 24, 32];


    //for loop with the same data from weatherresults
    for (let i = 0; i < indexes.length; i++) {
    let index = indexes[i];
    let dateData = dayjs(weatherResults.list[index].dt_txt.split(' ')[0]).format('M/DD/YYYY');
    let tempDataK = weatherResults.list[index].main.temp;
    let tempDataF = (((tempDataK - 273.15) * 9/5) + 32).toFixed(2);
    let windData = weatherResults.list[index].wind.speed;
    let humData = weatherResults.list[index].main.humidity;
                    
    let cityInfo = document.getElementById(`five-city-${index}`);
    let temp = document.getElementById(`five-temp-${index}`);
    let wind = document.getElementById(`five-wind-${index}`);
    let hum = document.getElementById(`five-hum-${index}`);
                    
    cityInfo.textContent = `${dateData}`;
    temp.textContent = `Temp: ${tempDataF} °F`;
    wind.textContent = `Wind: ${windData} MPH`;
    hum.textContent = `Humidity: ${humData} %`;
    }
}

//call function
searchAPI();


//saved city buttons to search for each city
let Nas = document.getElementById('search-nas');
let Cha = document.getElementById('search-cha');
let Kno = document.getElementById('search-kno');
let Gat = document.getElementById('search-gat');

Nas.addEventListener('click', function() {
    document.getElementById('search-input').value = 'Nashville';
    searchBtn.click()
})

Cha.addEventListener('click', function() {
    document.getElementById('search-input').value = 'Chattanooga';
    searchBtn.click()
})

Kno.addEventListener('click', function() {
    document.getElementById('search-input').value = 'Knoxville';
    searchBtn.click()
})

Gat.addEventListener('click', function() {
    document.getElementById('search-input').value = 'Gatlinburg';
    searchBtn.click()
})