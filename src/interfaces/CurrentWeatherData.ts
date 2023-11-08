export interface CurrentWeatherData {
  weather: any[]; // You can provide a more specific type for the 'weather' property
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: string;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  timezone: number;
}