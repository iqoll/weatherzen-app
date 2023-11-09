export interface AirPollutionData {
  list: [{
    main: {
      aqi: string
    };
    components: { no2: number, o3: number, so2: number, pm2_5: number}
  }]
}