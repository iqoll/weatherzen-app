import './styles/index.css'
import logoImg from'./assets/weather-icons/03d.png'
import oCloud from './assets/weather-icons/01d.png'
import o1n from './assets/weather-icons/01n.png'

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