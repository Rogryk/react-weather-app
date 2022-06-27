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
  alerts: string;
  temperature: number;
  description: string;
  icon: string;
  city: string;
}

export interface IForecastItem {
  icon: string;
  temperature: number;
  weekDay: string;
}
