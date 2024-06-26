// when page pops up, all serach histories in local storage is displayed
window.onload = function() {
    loadSavedCities();
};

//search button
const searchBtn = document.getElementById('search-btn');

//upon search button click, the apis run
function searchAPI() {
    searchBtn.addEventListener('click', function() {

        let city = document.getElementById('search-input').value;

        saveCity(city);
        // loads cities in search history
        loadSavedCities();

        document.getElementById('search-input').value = '';

        const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7f24f20a0a0533ff8f591e0bdf6457c2`;
        console.log(geoURL)
        
        fetch(geoURL)
            .then(response => response.json())
            
            .then(geoResults => {
                console.log(geoResults);
                let lat = geoResults[0].lat;
                let lon = geoResults[0].lon;
                const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7f24f20a0a0533ff8f591e0bdf6457c2`;
                
                fetch(weatherURL)
                    .then(response => response.json())

                    .then(weatherResults => {
                        console.log(weatherResults);

                        //after fetching weather results, get the info into variables
                        let mainWeather = weatherResults.list[0];

                        let dateData = dayjs(mainWeather.dt_txt.split(' ')[0]).format('M/DD/YYYY');
                        let tempDataK = mainWeather.main.temp;
                        let tempDataF = (((tempDataK - 273.15) * 9/5) + 32).toFixed(2);
                        let windData = mainWeather.wind.speed;
                        let humData = mainWeather.main.humidity;


                        let cityInfo = document.getElementById('main-city');
                        let temp = document.getElementById('main-temp');
                        let wind = document.getElementById('main-wind');
                        let hum = document.getElementById('main-hum');


                        //put the info in cooresponding id in html
                        cityInfo.textContent = city + ' ' + `(${dateData})`;
                        temp.textContent = `Temp: ${tempDataF} °F`;
                        wind.textContent = `Wind: ${windData} MPH`;
                        hum.textContent = `Humidity: ${humData} %`;


                        weatherIcon(weatherResults);

                        //displays function below (5-day forecast)
                        displayFiveDay(weatherResults);
                    }) 
            })
    })
}


//function for weather icon for main city
function weatherIcon(weatherResults) {
    let icon = document.getElementById('icon');
    let weatherIcon = weatherResults.list[0].weather[0].description;

    if (weatherIcon === "clear sky") {
        icon.textContent = "☀️";
    } else if (weatherIcon.includes("clouds")) {
        icon.textContent = "☁️";
    } else if (weatherIcon.includes("rain")) {
        icon.textContent = "🌧️";
    } else if (weatherIcon.includes("thunderstorm")) {
        icon.textContent = "🌩️";
    } else if (weatherIcon.includes("snow")) {
        icon.textContent = "❄️";
    } else {
        icon.textContent = "⛅";
    }
}


//function for 5-day forecast
function displayFiveDay(weatherResults) {

    //the specific array items with the new day
    let indexes = [2, 8, 16, 24, 32];


    //for loop with the same data from weatherresults
    for (let i = 0; i < indexes.length; i++) {
    let index = indexes[i];
    let fiveWeather = weatherResults.list[index];

    let dateData = dayjs(fiveWeather.dt_txt.split(' ')[0]).format('M/DD/YYYY');
    let tempDataK = fiveWeather.main.temp;
    let tempDataF = (((tempDataK - 273.15) * 9/5) + 32).toFixed(2);
    let windData = fiveWeather.wind.speed;
    let humData = fiveWeather.main.humidity;
                    
    let cityInfo = document.getElementById(`five-city-${index}`);
    let temp = document.getElementById(`five-temp-${index}`);
    let wind = document.getElementById(`five-wind-${index}`);
    let hum = document.getElementById(`five-hum-${index}`);

    cityInfo.textContent = `(${dateData})`;
    cityInfo.textContent = `${dateData}`;
    temp.textContent = `Temp: ${tempDataF} °F`;
    wind.textContent = `Wind: ${windData} MPH`;
    hum.textContent = `Humidity: ${humData} %`;
    
    //weather icons 
    let ic = document.getElementById(`ic-${index}`);
    let weatherIc = fiveWeather.weather[0].description;

        if (weatherIc === "clear sky") {
            ic.textContent = "☀️";
        } else if (weatherIc.includes("clouds")) {
            ic.textContent = "☁️";
        } else if (weatherIc.includes("rain")) {
            ic.textContent = "🌧️";
        } else if (weatherIc.includes("thunderstorm")) {
            ic.textContent = "🌩️";
        } else if (weatherIc.includes("snow")) {
            ic.textContent = "❄️";
        } else {
            ic.textContent = "⛅";
        }
    }
}


//call API function
searchAPI();


//save city input into local storage
function saveCity(city) {
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

    // check to see if the same city is already in the array
    if (!savedCities.includes(city)) {
        savedCities.push(city);
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
    }
}


//create search history buttons
function loadSavedCities() {
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
    let searchHistory = document.getElementById('search-history');


    //clear existing buttons
    searchHistory.innerHTML = '';

    //create buttons for each saved city
    savedCities.forEach(city => {
        let button = document.createElement('button');
        button.textContent = city;
        button.style.width = '100%';

        button.addEventListener('click', function() {
           document.getElementById('search-input').value = city;
           searchBtn.click();

        });

        searchHistory.appendChild(button);
    });

}