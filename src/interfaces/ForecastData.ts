export interface ForecastData {
  city: {
    timezone: number
  };
  list: [{
    weather: any[];
    dt_txt: number;
    main: { 
      temp_max: string 
    }
  }]  
}