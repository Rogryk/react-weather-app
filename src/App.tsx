import React, { useState, useEffect } from "react";
import BasicInfo from "./BasicInfo";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";
import ApiSettingsFile from "./store/ApiSetting";
import Loading from "./Loading";
import { IWeather } from "./store/types";

export interface IApi {
  link: string;
  key: string;
  lon: string;
  lat: string;
  unit: string;
  lang: string;
}

const App: React.FC = () => {
  const [apiSettings, setApiSettings] = useState<IApi>(ApiSettingsFile);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const apiLink =
      apiSettings.link +
      `lat=${apiSettings.lat}&lon=${apiSettings.lon}&units=${apiSettings.unit}&lang=${apiSettings.lang}&appid=${apiSettings.key}`;

    fetch(apiLink)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);

        return response;
      })
      .then((data) => setWeatherData(data))
      .then(() => setIsLoaded(true))
      .catch((error) => console.log(error));
  }, []);

  // display
  return (
    <main className="container">
      <SearchBar />
      {isLoaded ? (
        <BasicInfo
          alerts={weatherData.alerts}
          temperature={weatherData.current.temp}
          description={weatherData.current.weather[0].description}
          icon={weatherData.current.weather[0].icon}
        />
      ) : (
        <Loading /> //TODO: fetch styling
      )}
      {isLoaded && <Forecast daily={weatherData.daily} />}
    </main>
  );
};

export default App;
