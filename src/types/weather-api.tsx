export interface IWeather {
  main: string;
}

export interface IWeatherApi {
  name: string;
  sys: { country: "" };
  main: { temp: number };
  weather: IWeather[];
}
