export type Condition = {
  text: string
  icon: string
  code: number
}

export type Hour = {
  condition: Condition
  time: string
  wind_dir: string
  time_epoch: 1651096800
  temp_c: 6.9
  temp_f: 44.4
  is_day: 0
  wind_mph: 5.4
  wind_kph: 8.6
  wind_degree: 40
  pressure_mb: 1030
  pressure_in: 30.42
  precip_mm: 0
  precip_in: 0
  humidity: 78
  cloud: 5
  feelslike_c: number
  feelslike_f: 41.4
  windchill_c: 5.2
  windchill_f: 41.4
  heatindex_c: 6.9
  heatindex_f: 44.4
  dewpoint_c: 3.3
  dewpoint_f: 37.9
  will_it_rain: 0
  chance_of_rain: 0
  will_it_snow: 0
  chance_of_snow: 0
  vis_km: 10
  vis_miles: 6
  gust_mph: 7.8
  gust_kph: 12.6
  uv: 1
}

export type Astro = {
  sunrise: string
  sunset:string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: string
}

export type Day = {
  condition: Condition
  maxtemp_c: 13.2
  maxtemp_f: 55.8
  mintemp_c: 5.9
  mintemp_f: 42.6
  avgtemp_c: 9.3
  avgtemp_f: 48.8
  maxwind_mph: 9.4
  maxwind_kph: 15.1
  totalprecip_mm: 0
  totalprecip_in: 0
  avgvis_km: 10
  avgvis_miles: 6
  avghumidity: 64
  daily_will_it_rain: 0
  daily_chance_of_rain: 0
  daily_will_it_snow: 0
  daily_chance_of_snow: 0
  uv: 5
}

export type Location = {
  name: "London",
  region: "City of London, Greater London",
  country: "United Kingdom",
  lat: 51.52,
  lon : number,
  tz_id: "Europe/London",
  localtime_epoch : 1651081577,
  localtime : "2022-04-27 18:46"
}

export type EveryHour = Array<Hour>

export type ForecastDay = {
  astro: Astro
  date_epoch : number
  date: string
  day: Day
  hour: EveryHour
}

export type Forecast = {
  forecastday: Array<ForecastDay> 
}

export type Current = {
  condition: Condition
  feelslike_c: 9.5
  feelslike_f: 49.2
  gust_kph: 13.7
  gust_mph: 8.5
  humidity: 54
  is_day: 1
  last_updated: "2022-04-27 18:30"
  last_updated_epoch: 1651080600
  precip_in: 0
  precip_mm: 0
  pressure_in: 30.36
  pressure_mb: 1028
  temp_c: 11
  temp_f: 51.8
  uv: 4
  vis_km: 10
  vis_miles: 6
  wind_degree: 70
  wind_dir: "ENE"
  wind_kph: 11.2
  wind_mph: 6.9
}

export interface CurrentWeather  {
  location: Location
  current: Current
  forecast: {
    forecastday: Array<ForecastDay>
  }
}