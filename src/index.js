import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const input = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    if (parseInt(input)) {
      const url = `http://api.openweathermap.org/data/2.5/weather?zip=${parseInt(input)}&appid=${process.env.API_KEY}&units=imperial`
      request.open("GET", url, true);
    } else {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.API_KEY}&units=imperial`
      request.open("GET", url, true);
    }

    request.send(); 

  function getElements(response) {
      $(".showCity").text(`City: ${response.name}`)
      $(".showCondition").text(response.weather[0].main)
      $(".showWind").text(`Wind Speed: ${response.wind.speed} mph`)
      $('.showHumidity').text(`The humidity is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${response.main.temp} degrees.`);
    }
  });
});