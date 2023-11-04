import { updateWeather, error404 } from './index'

const defaultLocation: string = '#/weather?lat=51.5073219&lon=-0.1276474' // London

const currentLocation: Function = () => {
  window.navigator.geolocation.getCurrentPosition(res => {
    const { latitude, longitude } = res.coords

    updateWeather(`lat=${latitude}`, `lon=${longitude}`)
  }, err => {
    window.location.hash = defaultLocation
  })
}

/**
 * 
 * @param query Searched query
 */

const searchedLocation: Function = (query: string) => updateWeather(...query.split('&'))
// updateWeather('lat=51.5073219', 'lon=-0.1276474')

const routes: Map<string, Function> = new Map([
  ['/current-location', currentLocation],
  ['/weather', searchedLocation]
])

const checkHash = () => {
  const requestURL: string = window.location.hash.slice(1)

  const [route, query] = requestURL ? requestURL.split('?') : [requestURL]

  routes.get(route) ? routes.get(route)!(query) : error404();
}

window.addEventListener('hashchange', checkHash)

window.addEventListener('load', () => {
  if(!window.location.hash) {
    window.location.hash = '#/current-location'
  } else {
    checkHash()
  }
})