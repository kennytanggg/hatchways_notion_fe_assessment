const api_key = 'b7dc88a8227d0789516251f9056a5c12';
// const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`;
// const zip_code = 11220;
// const country_code = 'US';
// const url2 = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip_code},${country_code}&appid=${api_key}`;
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

class App {
	async getWeatherData() {
		const response = await fetch(url_5dayforecast);
		if (response.ok) {
			let data = await response.json();
			console.log(data);
			this.get5DayForecast(data);
		}
	}

	get5DayForecast(data) {
		// Return today's high and low temperatures over the next 4 days
		// Map data to UI (day, temp_high, temp_low, description, img)
		data.list.forEach((time) => {
			if (time.dt_txt.includes('12:00:00')) {
				const day_container = document.createElement('div');
				day_container.className = 'day-container';
				const day_label = document.createElement('label');
				day_label.innerText = DateUtil.convertDayToText(new Date(time.dt_txt).getDay());

				let {
					main: { temp_max: high_temp, temp_min: low_temp },
					weather: {
						0: { icon: icon }, //Gets the primary weather condition
					},
				} = time;

				const img = document.createElement('img');
				img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

				const temperature_container = document.createElement('div');
				temperature_container.className = 'temperature-container';

				const high_temp_label = document.createElement('label');
				high_temp_label.innerHTML = `${Math.round(high_temp)}&deg`;
				high_temp_label.className = 'temperature-high';

				const low_temp_label = document.createElement('label');
				low_temp_label.innerHTML = `${Math.round(low_temp)}&deg`;
				low_temp_label.className = 'temperature-low';

				temperature_container.append(high_temp_label, low_temp_label);
				day_container.append(day_label, img, temperature_container);

				document.querySelector('.weather-container').append(day_container);
			}
		});
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
		4: 'Thu',
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
