export interface IWeatherApi {
  id?: number;
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: [{ main: string }];
}

export interface IWeeklyForecastApi {
  dt: number;
  weather: [{ icon: string }];
  temp: { min: number; max: number };
}

export interface IDayForecastApi {
  dt: number;
  dt_txt: string;
  weather: [{ icon: string }];
  main: { temp: number };
}
