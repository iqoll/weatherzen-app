import axios from "axios"

const apiKey = process.env.API_KEY

console.log('Api Key: ', process.env.API_KEY)

export const fetchData = async (URL: string, callback: Function) => {
  await axios.get(`${URL}&appid=${apiKey}`)
  .then(response => callback(response.data))
  .catch(error => {
    console.log(error)
  })
}

export const url = {
  currentWeather(lat: string, lon: string) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
  },
  forecast(lat: string, lon: string) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
  },
  airPollution(lat: string, lon: string) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}&units=metric`
  },
  reverseGeo(lat: string, lon: string) {
    return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
  },
  // Search query e.g.: "London", "Jakarta"
  geo(query: string) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1`
  }
}