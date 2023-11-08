import './styles/index.css'
import { fetchData, url } from './api'
import * as module from './module'
import { CurrentWeatherData } from './interfaces/CurrentWeatherData'
import { Coordinates } from './interfaces/Coordinates'

/**
 * Assets for all the logo that are used
 */
import logoImg from'./assets/weather-icons/03d.png'
import o1d from './assets/weather-icons/01d.png'
import o2d from './assets/weather-icons/02d.png'
import o3d from './assets/weather-icons/03d.png'
import o4d from './assets/weather-icons/04d.png'
import o9d from './assets/weather-icons/09d.png'
import o10d from './assets/weather-icons/010d.png'
import o13d from './assets/weather-icons/013d.png'
import o50d from './assets/weather-icons/50d.png'
import o1n from './assets/weather-icons/01n.png'
import o2n from './assets/weather-icons/02n.png'
import o3n from './assets/weather-icons/03n.png'
import o4n from './assets/weather-icons/04n.png'
import o9n from './assets/weather-icons/09n.png'
import o10n from './assets/weather-icons/10n.png'
import o13n from './assets/weather-icons/13n.png'
import o50n from './assets/weather-icons/50n.png'
import { LocationData } from './interfaces/LocationData'

const logo = document.getElementById('logo') as HTMLImageElement
logo.src = logoImg
// const weatherIcon = document.getElementById('ocloud') as HTMLImageElement
// weatherIcon.src = oCloud

const forecast1 = document.getElementById('o1n') as HTMLImageElement
const forecast2 = document.getElementById('o2n') as HTMLImageElement
const forecast3 = document.getElementById('o3n') as HTMLImageElement
const forecast4 = document.getElementById('o4n') as HTMLImageElement
const forecast5 = document.getElementById('o5n') as HTMLImageElement

forecast1.src = o1n
forecast2.src = o2n
forecast3.src = o1d
forecast4.src = o4d
forecast5.src = o9n


/**
 * Add Event listener on multiple elements
 * @param elements Elements node array
 * @param eventType e.g. : 'click', 'mouseover'
 * @param callback Callback Function
 */
const addEventOnElements = (elements: NodeListOf<Element>, eventType: string, callback: (event: Event) => void): void => {
  for(const element of elements) element.addEventListener(eventType, callback)
} 

/**
 * SEARCH INTEGRATION
 */
const searchField = document.querySelector('[data-search-field]') as HTMLInputElement
const searchButton = document.querySelector('[data-search-button]') as HTMLButtonElement


const getWeatherData = (latitude: string, longitude: string) => {
  fetchData(url.currentWeather(`lat=${latitude}`, `lon=${longitude}`), (currentWeather: CurrentWeatherData) => {
    // console.log(currentWeather)
    const currentWeatherSection = document.querySelector('[data-current-weather]') as HTMLElement
    const sunriseSunsetSection = document.querySelector('[data-sunrise-sunset]') as HTMLDivElement
    const humiditySection = document.querySelector('[data-humidity]') as HTMLDivElement
    const pressureSection = document.querySelector('[data-pressure]') as HTMLDivElement
    const visibilitySection = document.querySelector('[data-visibility]') as HTMLDivElement
    const FeelsLikeSection = document.querySelector('[data-feels-like]') as HTMLDivElement

    currentWeatherSection.innerHTML = ''
    sunriseSunsetSection.innerHTML = ''
    humiditySection.innerHTML = ''
    pressureSection.innerHTML = ''
    visibilitySection.innerHTML = ''
    FeelsLikeSection.innerHTML = ''

    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: {temp, feels_like, pressure, humidity },
      visibility,
      timezone
    } = currentWeather
    const [{description, icon}] = weather
    console.log(currentWeather)
    
    /**
   * CURRENT WEATHER SECTION
   */

    const card = document.createElement('div')
    card.classList.add('flex', 'flex-col', 'space-y-3', 'bg-surface', 'p-6', 'text-onSurface', 'rounded-xl')

    card.innerHTML = `
      <h2 class="text-3xl">Now</h2>
      <div class="flex items-center">
        <p class="text-[5rem] mr-10">${parseInt(temp)}&deg;<sup class="text-3xl font-semibold">c</sup></p>
        <img id="ocloud" src="./assets/weather-icons/${icon}.png" class="mx-auto" width="64" height="64" alt="${description}">
      </div>
      <p class="text-lg md:text-xl">${description}</p>
      <ul class="pt-2 border-t-2 border-outline">
        <li class="flex items-center gap-2 mb-2">
          <span class="m-icon">calendar_today</span>
          <p class="text-onSurfaceVariant">${module.getDate(dateUnix, timezone)}</p>
        </li>
        
        <li class="flex items-center gap-2">
          <span class="m-icon">location_on</span>
          <p class="text-onSurfaceVariant" data-location></p>
        </li>
      </ul>
    `
    // Dynamic logo for the weather icon
    const image = card.querySelector('#ocloud') as HTMLImageElement
    if(image) {
      image.src = `assets/${icon}.png`
    }
    const locationElement = card.querySelector('[data-location]') as HTMLElement

    // Additional data for the location Element
    fetchData(url.reverseGeo(`lat=${latitude}`, `lon=${longitude}`), (location: LocationData[]) => {
      const {name, country} = location[0]

      if(locationElement) {
        locationElement.innerHTML = `${name}, ${country}`
      }
    })  
    currentWeatherSection.appendChild(card)

    /**
   * Sunrise Sunset Section
   */

    const cardSun = document.createElement('div')
    cardSun.classList.add('relative', 'bg-blackAlpha10', 'p-3', 'space-y-3', 'lg:py-16')
    cardSun.innerHTML = `
      <h3 class="text-onSurfaceVariant text-lg md:text-xl lg:absolute lg:top-8">Sunrise & Sunset</h3>
                  
      <div class="flex items-center flex-wrap flex-grow gap-y-2">
        <div class="flex items-center w-1/2 justify-end lg:justify-normal">
          <span class="m-icon mr-2 lg:mr-6">clear_day</span>
          <div>
            <p class="text-lg text-onSurfaceVariant">Sunrise</p>
            <p class="text-lg md:text-3xl lg:text-4xl">${module.getTime(sunriseUnixUTC, timezone)}</p>
          </div>
        </div>
        <div class="flex items-center w-1/2 justify-end lg:justify-start">
          <span class="m-icon mr-2 lg:mr-6">clear_night</span>
          <div>
            <p class="text-lg text-onSurfaceVariant">Sunset</p>
            <p class="text-lg md:text-3xl lg:text-4xl">${module.getTime(sunsetUnixUTC, timezone)}</p>
          </div>
        </div>
      </div>
    `
    sunriseSunsetSection.appendChild(cardSun)

     /**
   * Humidity Section
   */
    const cardHum = document.createElement('div')
    cardHum.classList.add('bg-blackAlpha10', 'p-3', 'space-y-3', 'lg:py-10')
    
    cardHum.innerHTML = `
      <h3 class="text-onSurfaceVariant text-lg md:text-xl">Humidity</h3>
      <div class="flex items-center justify-between gap-4 xl:justify-between">
        <span class="m-icon">humidity_percentage</span>

        <p class="text-4xl">${humidity}<sub class="text-3xl">%</sub></p>
      </div>
    `

    humiditySection.appendChild(cardHum)

      /**
   * Pressure Section
   */
  })
}

const getCoordinates = () => {
  const cityName = searchField.value.trim()
  if(!cityName) return

  fetchData(url.geo(cityName), (weatherDetails: Coordinates[]) => {
    if (weatherDetails.length > 0) {
      const { name, lat, lon } = weatherDetails[0]
      console.log(name, lat, lon)
      getWeatherData(lat, lon)
    } else {
      alert('No weather details found for this location.')
    }
  })
}

searchButton.addEventListener('click', getCoordinates)


const container = document.querySelector('[data-container]') as HTMLElement
const loading = document.querySelector('[data-loading]') as HTMLElement
const currentLocationBtn = document.querySelector('[data-current-location-btn]') as HTMLAnchorElement
const errorContent = document.querySelector('[data-error-content]') as HTMLElement

export const updateWeather = (...args: string[]) => {
  loading.classList.add('grid')
  container.style.overflowY = 'hidden'
  errorContent?.classList.add('hidden')

  
  const forecastSection = document.querySelector('[data-5-days-forecast]') as HTMLElement
  const highlightSection = document.querySelector('[data-highlights]') as HTMLElement


  forecastSection.innerHTML = ''
  highlightSection.innerHTML = ''

  if (window.location.hash === '#/current-location') {
    currentLocationBtn.setAttribute('disabled', '')
  } else {
    currentLocationBtn.removeAttribute('disabled')
  }

  
  fetchData(url.currentWeather(args[0], args[1]), (currentWeather: CurrentWeatherData)=> {
    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: {temp, feels_like, pressure, humidity },
      visibility,
      timezone
    } = currentWeather
    const [{ description, icon }] = weather   
  })
}

export const error404 = () => {
  
}


