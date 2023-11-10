import './styles/index.css'
import { fetchData, url } from './api'
import * as module from './module'

import { CurrentWeatherData } from './interfaces/CurrentWeatherData'
import { Coordinates } from './interfaces/Coordinates'
import { LocationData } from './interfaces/LocationData'
import { ForecastData } from './interfaces/ForecastData'


/**
 * UTILITY FUNCTION
 */

function showLoadingScreen() {
  const loadingScreen = document.querySelector('[data-loading]') as HTMLElement;
  loadingScreen.classList.remove('hidden');
  loadingScreen.classList.add('grid')
}

function hideLoadingScreen() {
  const loadingScreen = document.querySelector('[data-loading]') as HTMLElement;
  loadingScreen.classList.remove('grid')
  loadingScreen.classList.add('hidden');
}

function showError404(){
  const errorContent = document.querySelector('[data-error-content]') as HTMLElement
  errorContent.classList.remove('hidden')
  errorContent.classList.add('flex')
}

function hideError404(){
  const errorContent = document.querySelector('[data-error-content]') as HTMLElement
  errorContent.classList.remove('flex')
  errorContent.classList.add('hidden')
}


/**
 * SEARCH INTEGRATION
 */
const searchField = document.querySelector('[data-search-field]') as HTMLInputElement
const searchButton = document.querySelector('[data-search-button]') as HTMLButtonElement
const currentLocationBtn = document.querySelector('[data-current-location-btn]') as HTMLButtonElement
const goHomeBtn = document.querySelector('[go-home]') as HTMLButtonElement



/**
 * Functions to get the weather data based on the user's query
 * Plus handle the dom manipulation for all of the section
 */
const getWeatherData = (latitude: string, longitude: string) => {
  showLoadingScreen();

  /**
 * Fetching the initial data
 */
  fetchData(url.currentWeather(`lat=${latitude}`, `lon=${longitude}`), (currentWeather: CurrentWeatherData) => {
    /**
  * All of the document that are going to be manipulated
  */
    const currentWeatherSection = document.querySelector('[data-current-weather]') as HTMLElement
    const sunriseSunsetSection = document.querySelector('[data-sunrise-sunset]') as HTMLDivElement
    const humiditySection = document.querySelector('[data-humidity]') as HTMLDivElement
    const pressureSection = document.querySelector('[data-pressure]') as HTMLDivElement
    const visibilitySection = document.querySelector('[data-visibility]') as HTMLDivElement
    const FeelsLikeSection = document.querySelector('[data-feels-like]') as HTMLDivElement
    const forecastSection = document.querySelector('[data-5-days-forecast]') as HTMLElement
    const airQualitySection = document.querySelector('[data-air-quality]') as HTMLDivElement

    currentWeatherSection.innerHTML = ''
    sunriseSunsetSection.innerHTML = ''
    humiditySection.innerHTML = ''
    pressureSection.innerHTML = ''
    visibilitySection.innerHTML = ''
    FeelsLikeSection.innerHTML = ''
    forecastSection.innerHTML = ''
    airQualitySection.innerHTML = ''

    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: {temp, feels_like, pressure, humidity },
      visibility,
      timezone
    } = currentWeather
    const [{description, icon}] = weather
    
    /**
   * CURRENT WEATHER SECTION
   */

    const card = document.createElement('div')
    card.classList.add('flex', 'flex-col', 'space-y-3', 'bg-surface', 'p-6', 'text-onSurface', 'rounded-xl')

    card.innerHTML = `
      <h2 class="text-3xl">Now</h2>
      <div class="flex items-center" parent-image>
        <p class="text-[5rem] mr-10">${parseInt(temp)}&deg;<sup class="text-3xl font-semibold">c</sup></p>
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
    const image = document.createElement('img')
    image.alt = description
    image.classList.add('mx-auto')
    image.width = 64
    image.height = 64
    
    import(`./assets/weather-icons/${icon}.png`)
      .then((img) => {
        image.src = img.default
      })
      .catch((error) => {
        console.error('Error loading image:', error)
      })

    const imgParent = card.querySelector('[parent-image]')
    if(imgParent) {
      imgParent.appendChild(image)
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
      <h3 class="text-onSurfaceVariant text-xl lg:absolute lg:top-8">Sunrise & Sunset</h3>
                  
      <div class="flex items-center flex-wrap flex-grow gap-y-2">
        <div class="flex items-center w-1/2 justify-end lg:justify-normal">
          <span class="m-icon mr-2 lg:mr-6">clear_day</span>
          <div>
            <p class="text-xl text-onSurfaceVariant">Sunrise</p>
            <p class="text-2xl md:text-3xl lg:text-4xl">${module.getTime(sunriseUnixUTC, timezone)}</p>
          </div>
        </div>
        <div class="flex items-center w-1/2 justify-end lg:justify-start">
          <span class="m-icon mr-2 lg:mr-6">clear_night</span>
          <div>
            <p class="text-xl text-onSurfaceVariant">Sunset</p>
            <p class="text-2xl md:text-3xl lg:text-4xl">${module.getTime(sunsetUnixUTC, timezone)}</p>
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
      <h3 class="text-onSurfaceVariant text-xl">Humidity</h3>
      <div class="flex items-center justify-between gap-4 xl:justify-between">
        <span class="m-icon">humidity_percentage</span>

        <p class="text-4xl">${humidity}<sub class="text-3xl">%</sub></p>
      </div>
    `

    humiditySection.appendChild(cardHum)

      /**
   * Pressure Section
   */
    const cardPre = document.createElement('div')
    cardPre.classList.add('bg-blackAlpha10', 'p-3', 'space-y-3', 'lg:py-10')

    cardPre.innerHTML = `
      <h3 class="text-onSurfaceVariant text-xl">Pressure</h3>
      <div class="flex items-center justify-between gap-4">
        <span class="m-icon">airwave</span>

        <p class="text-4xl">${pressure}<sub class="text-3xl">hPa</sub></p>
      </div>
    `

    pressureSection.appendChild(cardPre)

      /**
   * Visibility Section
   */
    const cardVis = document.createElement('div')
    cardVis.classList.add('bg-blackAlpha10', 'p-3', 'space-y-3', 'lg:py-10')

    cardVis.innerHTML = `
      <h3 class="text-onSurfaceVariant text-xl">Visibility</h3>
      <div class="flex items-center justify-between gap-4">
        <span class="m-icon">visibility</span>

        <p class="text-4xl">${visibility / 1000}<sub class="text-3xl">km</sub></p>
    `

    visibilitySection.appendChild(cardVis)

    /**
   * Feels Like Section
   */
    const cardFeels = document.createElement('div')
    cardFeels.classList.add('bg-blackAlpha10', 'p-3', 'space-y-3', 'lg:py-10')

    cardFeels.innerHTML = `
      <h3 class="text-onSurfaceVariant text-xl">Feels Like</h3>
      <div class="flex items-center justify-between gap-4">
        <span class="m-icon">thermostat</span>

        <p class="text-4xl">${feels_like}&deg;<sup class="text-3xl">c</sup></p>
      </div>
    `

    FeelsLikeSection.appendChild(cardFeels)

    /**
   * Forecast Section
   */
    fetchData(url.forecast(`lat=${latitude}`, `lon=${longitude}`), (forecast: ForecastData) => {
      const {
        list: forecastList
      } = forecast
      
      forecastSection.innerHTML = `
        <h2 class="text-3xl font-semibold mb-3" id="forecast-label">5 Days Forecast</h2>
          <div class="flex flex-col space-y-3 bg-surface p-6 text-onSurface rounded-xl">
            <ul class="flex flex-col space-y-4" data-forecast-list></ul>
          </div>
        `

      for(let i = 7, len = forecastList.length; i < len; i += 8) {
        const {
          main: { temp_max },
          weather,
          dt_txt
        } = forecastList[i]
        const [{description, icon}] = weather
        const date = new Date(dt_txt)

        const li = document.createElement('li')
        li.classList.add('flex', 'justify-between', 'items-center')

        li.innerHTML = `
          <div class="flex items-center" forecast-image-parent>
            <span class="text-xl">${parseInt(temp_max)}&deg;<sup>c</sup></span>
          </div>
          <p class="text-onSurfaceVariant text-lg ">${date.getDate()} ${module.monthNames[date.getUTCMonth()]}</p>
          <p class="text-onSurfaceVariant text-lg ">${module.weekDayNames[date.getUTCDay()]}</p>
        `
        const image = document.createElement('img')
        image.alt = description
        image.height = 36
        image.width = 36

        import(`./assets/weather-icons/${icon}.png`)
          .then((img) => {
          image.src = img.default
        })
          .catch((error) => {
          console.error('Error loading image:', error)
        })

        const forecastParentImg = li.querySelector('[forecast-image-parent]')

        if(forecastParentImg) {
          forecastParentImg.prepend(image)
        }

        const ul = forecastSection.querySelector('[data-forecast-list]')
        if(ul) {
          ul.appendChild(li)
        }
      }
    })

     /**
   * Air Quality Index Section
   */
    fetchData(url.airPollution(`lat=${latitude}`, `lon=${longitude}`), (airPollution: AirPollutionData) => {
      const [{
        main: {aqi},
        components: { no2, o3, so2, pm2_5 }
      }] = airPollution.list

      console.log(pm2_5)
      const cardAir = document.createElement('div')
      cardAir.classList.add('relative', 'bg-blackAlpha10', 'p-3', 'space-y-3', 'lg:py-16')

      cardAir.innerHTML = `
              <h3 class="text-onSurfaceVariant text-lg md:text-xl lg:absolute lg:top-8">Air Quality Index</h3>

                <div class="flex items-center justify-between">
                  <span class="m-icon">air</span>
                  <ul class="flex items-center flex-wrap flex-grow gap-y-2 py-2 px-1 lg:flex-nowrap">
                    <li class="flex w-1/2 space-x-1 justify-end md:items-end md:flex-col-reverse md:space-x-0">
                      <p class="text-xl md:text-4xl">${pm2_5.toPrecision(3)}</p>
                      <p class="text-xl text-onSurfaceVariant">PM<sub>2.5</sub></p>
                    </li>
                    <li class="flex w-1/2 space-x-1 justify-end md:items-end md:flex-col-reverse md:space-x-0">
                      <p class="text-xl md:text-4xl">${so2.toPrecision(3)}</p>
                      <p class="text-xl text-onSurfaceVariant ">SO<sub>2</sub></p>
                    </li>
                    <li class="flex w-1/2 space-x-1 justify-end md:items-end md:flex-col-reverse md:space-x-0">
                      <p class="text-xl md:text-4xl">${no2.toPrecision(3)}</p>
                      <p class="text-xl text-onSurfaceVariant">NO<sub>2</sub></p>
                    </li>
                    <li class="flex w-1/2 space-x-1 justify-end md:items-end md:flex-col-reverse md:space-x-0">
                      <p class="text-xl md:text-4xl">${o3.toPrecision(3)}</p>
                      <p class="text-xl text-onSurfaceVariant">O<sub>3</sub></p>
                    </li>
                  </ul>
                </div>
                <span id="aqi" class="absolute top-0 right-4 lg:top-4 rounded-radiusPill font-bold py-1 px-3 text-onBgAqi1 cursor-help" title="${module.aqiText[aqi].message}">${module.aqiText[aqi].level}</span>
      `
      const aqiMessage = cardAir.querySelector('#aqi')
      if(aqiMessage) {
        switch (aqiMessage.innerHTML) {
          case 'Good':
            aqiMessage.classList.add('bg-bgAqi1', 'text-onBgAqi1');
            break;
          case 'Fair':
            aqiMessage.classList.add('bg-bgAqi2', 'text-onBgAqi2');
            break;
          case 'Moderate':
            aqiMessage.classList.add('bg-bgAqi3', 'text-onBgAqi3');
            break;
          case 'Poor':
            aqiMessage.classList.add('bg-bgAqi4', 'text-onBgAqi4');
          case 'Very Poor':
            aqiMessage.classList.add('bg-bgAqi5', 'text-onBgAqi5')
        }
      }
      airQualitySection.appendChild(cardAir)
    })
    hideLoadingScreen()
  })
}

/**
 * Functions to get the user's query location
 */
const getCoordinates = () => {
  const cityName = searchField.value.trim()
  if(!cityName) return

  fetchData(url.geo(cityName), (weatherDetails: Coordinates[]) => {
    if (weatherDetails.length > 0) {
      const { lat, lon } = weatherDetails[0]

      getWeatherData(lat, lon)
    } else {
      showError404()
    }
  })
}

/**
 * Function to get the user's location
 */
const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords
      getWeatherData(latitude.toString(), longitude.toString())
    },
    error => {
      console.log(error)
    }
  )
}


/**
 * Event Listeners
 */
searchButton.addEventListener('click', getCoordinates)
currentLocationBtn.addEventListener('click', getUserCoordinates)
goHomeBtn.addEventListener('click', hideError404)


/**
 * Assets for all the default logo that are used
 */
import logoImg from'./assets/weather-icons/03d.png'
import o1d from './assets/weather-icons/01d.png'

import { AirPollutionData } from './interfaces/AirPollutionData'

const logo = document.getElementById('logo') as HTMLImageElement
logo.src = logoImg
const weatherIcon = document.getElementById('ocloud') as HTMLImageElement
weatherIcon.src = o1d

const forecast1 = document.getElementById('o1n') as HTMLImageElement
const forecast2 = document.getElementById('o2n') as HTMLImageElement
const forecast3 = document.getElementById('o3n') as HTMLImageElement
const forecast4 = document.getElementById('o4n') as HTMLImageElement
const forecast5 = document.getElementById('o5n') as HTMLImageElement

forecast1.src = logoImg
forecast2.src = logoImg
forecast3.src = logoImg
forecast4.src = logoImg
forecast5.src = logoImg