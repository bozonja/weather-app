export interface IWeatherApi {
  id?: number;
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: [{ main: string }];
}

export interface IWeatherDetailsApi {
  dt: number;
  weather: [{ icon: string }];
  temp: { min: number; max: number };
}

export interface IWeatherApiDay {
  dt: number;
  dt_txt: string;
  weather: [{ icon: string }];
  main: { temp: number };
}
