import React, { useState, useEffect } from "react";
import BasicInfo from "./BasicInfo";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";
import ApiSettingsFile from "./store/ApiSetting";
import Loading from "./Loading";
import { IApi, ILocation } from "./store/Interface";

const App: React.FC = () => {
  const [apiSettings, setApiSettings] = useState<IApi>(ApiSettingsFile);
  const [location, setLocation] = useState<ILocation>({
    lon: "21.0122287",
    lat: "52.2296756",
  });
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const apiLink =
      apiSettings.link +
      `lat=${location.lat}&lon=${location.lon}&units=${apiSettings.unit}&lang=${apiSettings.lang}&appid=${apiSettings.key}`;

    fetch(apiLink)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        return response;
      })
      .then((data) => setWeatherData(data))
      .then(() => setIsLoaded(true))
      .catch((error) => console.log(error));
  }, [apiSettings]);

  // display
  return (
    <main className="container">
      <SearchBar setApiSettings={setApiSettings} setCity={setCity} />
      {city && isLoaded ? (
        <BasicInfo
          alerts={weatherData.alerts}
          temperature={weatherData.current.temp}
          description={weatherData.current.weather[0].description}
          icon={weatherData.current.weather[0].icon}
          city={city}
        />
      ) : city ? (
        <Loading /> //TODO: fetch styling
      ) : (
        ""
      )}
      {isLoaded && <Forecast daily={weatherData.daily} />}
    </main>
  );
};

export default App;
