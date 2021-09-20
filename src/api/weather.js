import axios from 'axios'
// variable store key for api
const apiId = 'e20a75e27a49a2e8acfee2fcfa0691d1'
// variable to use in api call
// uses city state and units imperial
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='

// weather component api call function
export const showWeather = (city, state) => {
  return axios({
    url: weatherURL + city + ',' + state + '&units=imperial&appid=' + apiId,
    method: 'GET'
  })
}
