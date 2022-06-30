export interface IWeather {
  alerts: [];
  current: {};
  daily: [];
  hourly: [];
  lat: number;
  lon: number;
  minutely: [];
  timezone: string;
  timezone_offset: number;
}

export interface IApi {
  link: string;
  key: string;
  unit: string;
  lang: string;
}

export interface ILocation {
  lon: string;
  lat: string;
}

export interface ISearchBar {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
}

export interface IBasicInfo {
  temperature: number;
  description: string;
  icon: string;
  city: string;
  alerts: string;
  setIsAlertsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IForecastItem {
  icon: string;
  temperature: number;
  weekDay: string;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}
