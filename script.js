// API key - Openweathermap - b7dc88a8227d0789516251f9056a5c12
//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
// Icon is based on API response (icon)

const api_key = 'b7dc88a8227d0789516251f9056a5c12';
const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`;

const zip_code = 11220;
const country_code = 'US';
// const url2 = `http://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid=${api_key}`;
const url2 = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip_code},${country_code}&appid=${api_key}`;

// Open Weather API Response Geocoding
/*
{zip: '11228', name: 'New York', lat: 40.6174, lon: -74.0121, country: 'US'}
country: "US"
lat: 40.6174
lon: -74.0121
name: "New York"
zip: "11228"
*/

//11209
//lat: 40.6251
//lon: -74.0303

//11220
//lat: 40.6412
//lon: -74.0133

const lat = 40.6174;
const lon = -74.0121;
const url_5dayforecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`;

// Get data from API
// Create class for App
// Create class UI

// 08-27-2022
// Plan for today
// Figure out how to use API to get weather forecast for today
// Get the data for 5 days
// Map the data to the UI

// Get data
// Filter the response for today's date
// 5 days at a specific time

class App {
	// constructor() {
	// 	this.getWeatherData();
	// }
	// KT: Could make these static methods
	async getWeatherData() {
		const response = await fetch(url_5dayforecast);
		if (response.ok) {
			let data = await response.json();
			console.log(data);
			this.get5DayForecast(data);
		}
	}

	get5DayForecast(data) {
		// Return today's high and low temperatures, and the next 4 days
		data.list.forEach((time) => {
			if (time.dt_txt.includes('12:00:00')) {
				//#region
				/*
			<div class="day-container">
				<label>Wednesday</label>
				<img src="http://openweathermap.org/img/wn/01d@2x.png"></img>
				<div class='temperature-container'>
					<label class='temperature-high'>95</label>
					<label class='temperature-low'>88</label>
				</div>
			</div>
			*/
				//#endregion
				const day_container = document.createElement('div');
				day_container.className = 'day-container';
				const day_label = document.createElement('label');
				day_label.innerText = DateUtil.convertDayToText(new Date(time.dt_txt).getDay());

				console.log(time);
				// Map data to UI (day, temp_high, temp_low, description, img)

				let {
					main: { temp_max: high_temp, temp_min: low_temp },
					weather: {
						0: { icon: icon }, //Gets the primary weather condition
					},
				} = time;
				console.log(low_temp);

				const img = document.createElement('img');
				img.src = `http://openweathermap.org/img/wn/${icon}.png`;

				const temperature_container = document.createElement('div');
				temperature_container.className = 'temperature-container';

				const high_temp_label = document.createElement('label');
				high_temp_label.innerText = Math.round(high_temp);

				const low_temp_label = document.createElement('label');
				low_temp_label.innerText = Math.round(low_temp);

				temperature_container.append(high_temp_label, low_temp_label);
				day_container.append(day_label, img, temperature_container);

				console.log(day_container, temperature_container);

				document.querySelector('.weather-container').append(day_container);
			}
		});

		// Create an empty array with weather objects
		// Iterate through each one, map the data

		// Day 1 - tomorrow's forecast at noon
		// Day 2 - the next day's forecast at noon
		// Day 3 - the next day's forecast at noon
		// Day 4 - the next day's forecast at noon
		// Day 5 - the next day's forecast at noon

		// console.log(weatherdata, initial_result_date);

		// if (date != !isTodaysDate) {
		// 	console.log('false');
		// }
	}

	initialize() {
		this.getWeatherData();
	}
}

class DateUtil {
	static days = {
		0: 'Sun',
		1: 'Mon',
		2: 'Tue',
		3: 'Wed',
		4: 'Thur',
		5: 'Fri',
		6: 'Sat',
	};

	static convertDayToText(day) {
		if (this.days[day]) return this.days[day];
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const app = new App();
	app.initialize();
});
