import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import WeatherService from './weather-service';

function clearFields() {
  $('#location').val('');
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let input = $('#location').val();
    clearFields();
    let promise = WeatherService.getWeather(input);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showCity').text(`City: ${body.name}`);
      $('.showCondition').text(`condition: ${body.weather[0].main}`);
      $('.showWind').text(`wind speed: ${body.wind.speed} mph`)
      $('.showHumidity').text(`The humidity is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${body.main.temp} degrees fahrenheit.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});