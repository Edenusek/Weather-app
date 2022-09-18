const input = document.querySelector(".input-town"),
	img = document.querySelector(".weather-img"),
	btn = document.querySelector(".btn"),
	error = document.querySelector(".error"),
	temperature = document.querySelector(".temp"),
	pressure = document.querySelector(".pressure"),
	windSpeed = document.querySelector(".wind-speed"),
	humidity = document.querySelector(".humidity"),
	cloudiness = document.querySelector(".cloudiness"),
	town = document.querySelector(".town"),
	API_KEY = "&appid=159c517b96d47cd85b17f3d7b9cf41d9",
	API_METRIC = "&units=metric",
	API_WEATHER = "https://api.openweathermap.org/data/2.5/weather?q=",
	API_LANGUAGE = "&lang=pl",
	weather = function () {
		var e = input.value || "Bytom";
		axios
			.get(API_WEATHER + e + API_KEY + API_METRIC + API_LANGUAGE)
			.then(function (e) {
				var t = e.data.weather[0].id;
				(town.textContent = input.value || "Bytom"),
					(temperature.textContent = Math.floor(e.data.main.temp) + " °C"),
					(pressure.textContent = e.data.main.pressure + " hPa"),
					(windSpeed.textContent = e.data.wind.speed + " m/s"),
					(humidity.textContent = e.data.main.humidity + " %"),
					(cloudiness.textContent = e.data.weather[0].description),
					(error.textContent = ""),
					(input.value = ""),
					200 <= t && t <= 232
						? img.setAttribute("src", "./img/storm.png")
						: 500 <= t && t <= 532
						? img.setAttribute("src", "./img/rain.png")
						: 600 <= t && t <= 622
						? img.setAttribute("src", "./img/snow.png")
						: 800 === t
						? img.setAttribute("src", "./img/sun.png")
						: 801 <= t &&
						  t <= 804 &&
						  img.setAttribute("src", "./img/cloudy.png");
			})
			.catch(function () {
				return (error.textContent = "Podaj poprawną nazwę miasta!");
			});
	},
	enterPress = function (e) {
		"Enter" === e.key && weather();
	};
weather(),
	input.addEventListener("keypress", enterPress),
	btn.addEventListener("click", weather);