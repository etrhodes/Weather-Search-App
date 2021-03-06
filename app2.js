"use strict";

const searchURL = 'https://community-open-weather-map.p.rapidapi.com/';
const googleURL = 'https://google-news.p.rapidapi.com/v1/search?q=E';

function newsSearch() {
    $('#search').on('submit', event => {
        event.preventDefault();
        let googleQuery = $('#news-search').val();
        displayNews(googleQuery);
    })
}



function searchCurrent() {
    $('form#current-form').on('submit', event => {
        event.preventDefault();
        let city = $('#current-weather').val();
        console.log(city);
        currentWeather(city);
    });
}

function currentWeather(city) {
    let currentParams = `weather?q=${city}&units=imperial`;
    let currentSearchURL = searchURL + currentParams;
    console.log(currentSearchURL);
    fetch(currentSearchURL, {
	"headers": {
		"x-rapidapi-key": "2b8b09ddeamsh68aaebeff7640a2p14dbc8jsna48b4df442b7",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => {
    if(response.ok) {
        return response.json();
    }   
})
.then(responseJson => {
    console.log(responseJson);
    displayCurrent(responseJson);
})
.catch(err => {
	alert('City not found. Please try again.');
});
}

function displayCurrent(responseJson) {
    if (Object.keys(responseJson).length === 0) {
        alert('No results found.');
        return;
    }
    $('#target').empty();
    $('#target').append(`
    <div id="current-results">
        <p><h2 class="black">${responseJson.name}</h2></p>
        <p>The main temperature today is ${responseJson.main.temp}°.</p>
        <p>Feels like ${responseJson.main.feels_like}°.</p>
        <p>The low temp today is ${responseJson.main.temp_min}°.</p>
        <p>The high temp today is ${responseJson.main.temp_max}°.</p>
    </div>
    `)
    $('#results').removeClass('hidden')
}

function forecast() {
    $('form#forecast-form').on('submit', event => {
        event.preventDefault();
        let forecastCity = $('#forecast').val();
        console.log(forecastCity);
        getForecast(forecastCity);
    });
}

function getForecast(forecastCity) {
let forecastParams = `forecast/daily?q=${forecastCity}&units=imperial`;
let forecastURL = searchURL + forecastParams;
console.log(forecastURL);
fetch(forecastURL, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2b8b09ddeamsh68aaebeff7640a2p14dbc8jsna48b4df442b7",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}      
})
.then(response => {
	if(response.ok) {
        return response.json();
    }
})
.then(responseJson => {
    console.log(responseJson);
    displayForecast(responseJson);

})
.catch(err => {
	alert('City not found. Please try again.');
});
}

function displayForecast(responseJson) {
    if (Object.keys(responseJson).length === 0) {
        alert('No results found.');
        return;
    }
    $('#target').empty();
    let day = 1;
    let i = 0;
    $('#target').append(`
        <h3>Your 7 day forcast for ${responseJson.name}</h3>
    `
    )
    for (let i = 0; i < responseJson.list.length; i++) {
    $('#target').append(`
        <div id="forecast-results">
            <p><h3 class="black">Day ${day}: </h3></p>
            <p>Daytime temp: ${responseJson.list[i].temp.day}°</p>
            <p>Low temp: ${responseJson.list[i].temp.min}°</p>
            <p>High temp: ${responseJson.list[i].temp.max}°</p>
            <p><h3 class="black">Feels like: </h3></p>
            <p>Day: ${responseJson.list[i].feels_like.day}°</p>
            <p>Night: ${responseJson.list[i].feels_like.night}°</p>
            <p>Evening: ${responseJson.list[i].feels_like.eve}°</p>
            <p>Morning: ${responseJson.list[i].feels_like.morn}°</p>
        </div>
    `);
    day ++;
};
    $('#results').removeClass('hidden')
}

function handleApp() {
    searchCurrent();
    forecast();
}

handleApp();


/*
APIs Used: https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/google-news?endpoint=apiendpoint_5e0fa919-2494-4b20-a212-d186b7e8c3d8
*/