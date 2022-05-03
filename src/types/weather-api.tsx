export interface IWeather {
  main: string;
}

export interface IWeatherApi {
  id?: number;
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: IWeather[];
}
