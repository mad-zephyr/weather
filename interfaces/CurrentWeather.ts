export type Condition = {
  text: string
  icon: string
  code: number
}

export type Hour = {
  condition: Condition
  time: string
  wind_dir: string
  time_epoch: number
  temp_c: number
  temp_f: number
  is_day: number
  wind_mph: number
  wind_kph: number
  wind_degree: number
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
  uv: number
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
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  uv: number
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
  location?: Location
  current?: Current
  forecast?: {
    forecastday?: Array<ForecastDay>
  }
}