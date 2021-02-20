document.getElementById("weatherSubmit").addEventListener("click", function(event){
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  //daily weather API call
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0a83abc05effcf41872e0e8b907fcc84";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      //format results from the daily weather JSON object
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p> Feels like: ";
      results += json.main.feels_like;
      results += "<p>"
      results += "<p> High: ";
      results += json.main.temp_max;
      results += "<p>"
      results += "<p> Low: ";
      results += json.main.temp_min;
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	      results += json.weather[i].description
	    if (i !== json.weather.length - 1)
	      results += ", "
      }
      results += "<p> Wind: ";
      results += json.wind.speed
      results += " mph </p>"
      results += "<p> Pressure: ";
      results += json.main.pressure;
      results += "</p><hr>"
      document.getElementById("weatherResults").innerHTML = results;
    });
    //forecast API call
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=0a83abc05effcf41872e0e8b907fcc84";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        //format results from forecast JSON object
        let forecast = "";
        forecast += "<h2>Weekly Forecast</h2>"
      for (let i=0; i < json.list.length; i++) {
	      forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h3>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
	      forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += "<p> Will Feel Like: " + json.list[i].main.feels_like + "</p>";
        forecast += "<p> High: " + json.list[i].main.temp_max + "</p>";
        forecast += "<p> Low: " + json.list[i].main.temp_min + "</p>";
        forecast += "<p> Pressure: " + json.list[i].main.pressure + "</p>";
        forecast += "<p> Humidity: " + json.list[i].main.humidity + "</p>";
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});