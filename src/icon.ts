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

const logo = document.getElementById('logo') as HTMLImageElement
logo.src = logoImg
const weatherIcon = document.getElementById('ocloud') as HTMLImageElement
weatherIcon.src = o1d

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