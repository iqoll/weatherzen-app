import './styles/index.css'
import { fetchData, url } from './api'
import * as module from './module'

/**
 * Assets for all the logo that are used
 */
import logoImg from'./assets/weather-icons/03d.png'
import oCloud from './assets/weather-icons/01d.png'
import o1n from './assets/weather-icons/01n.png'

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

let searchTimeout = null;
const searchTimeoutDuration = 500

searchField?.addEventListener('input', () => {
  if(searchField.value) {
    searchTimeout = setTimeout(() => {
      //fetchData(url.geo(searchField.value, ))
    }, searchTimeoutDuration)
  }
})

const container = document.querySelector('[data-container]') as HTMLElement
const loading = document.querySelector('[data-loading]') as HTMLElement
const currentLocationBtn = document.querySelector('[data-current-location-btn]') as HTMLAnchorElement
const errorContent = document.querySelector('[data-error-content]') as HTMLElement

export const updateWeather = (...args: string[]) => {
  loading.classList.add('grid')
  container.style.overflowY = 'hidden'
  errorContent?.classList.add('hidden')

  const currentWeatherSection = document.querySelector('[data-current-weather]') as HTMLElement
  const forecastSection = document.querySelector('[data-5-days-forecast]') as HTMLElement
  const highlightSection = document.querySelector('[data-highlights]') as HTMLElement

  currentWeatherSection.innerHTML = ``
}

export const error404 = () => {

}


const logo = document.getElementById('logo') as HTMLImageElement
logo.src = logoImg
const weatherIcon = document.getElementById('ocloud') as HTMLImageElement
weatherIcon.src = oCloud

const forecast1 = document.getElementById('o1n') as HTMLImageElement
const forecast2 = document.getElementById('o2n') as HTMLImageElement
const forecast3 = document.getElementById('o3n') as HTMLImageElement
const forecast4 = document.getElementById('o4n') as HTMLImageElement
const forecast5 = document.getElementById('o5n') as HTMLImageElement

forecast1.src = o1n
forecast2.src = o1n
forecast3.src = o1n
forecast4.src = o1n
forecast5.src = o1n