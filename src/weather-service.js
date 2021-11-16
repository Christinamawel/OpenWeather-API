export default class WeatherService {
  static getWeather(input) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url

      if (parseInt(input)) {
          url = `http://api.openweathermap.org/data/2.5/weather?zip=${parseInt(input)}&appid=${process.env.API_KEY}&units=imperial`
        } else {
          url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.API_KEY}&units=imperial`
        }
      // const url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.API_KEY}&units=imperial`
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
}