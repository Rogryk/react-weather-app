import React, { useState, useEffect, useRef } from "react";
import BasicInfo from "./BasicInfo";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";
import ApiSettingsFile from "./store/ApiSetting";
import Loading from "./Loading";
import { IApi, ILocation } from "./store/Interface";

const App: React.FC = () => {
  const [apiSettings, setApiSettings] = useState<IApi>(ApiSettingsFile);
  const [location, setLocation] = useState<ILocation>({
    lon: "",
    lat: "",
  });
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const container = useRef<any>(null);
  const background = useRef<any>(null);

  useEffect(() => {
    const apiLink =
      apiSettings.link +
      `lat=${location.lat}&lon=${location.lon}&units=${apiSettings.unit}&lang=${apiSettings.lang}&appid=${apiSettings.key}`;
    if (location.lon && location.lat) {
      fetch(apiLink)
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          return response;
        })
        .then((data) => setWeatherData(data))
        .then(() => setIsLoaded(true))
        .then(() => {
          if (container.current != null) {
            container.current.classList.remove("minimize");
            background.current.style.backgroundImage = `url(${backgroundImage})`;
          }
        })
        .catch((error) => console.log(error));
    }
    console.log(backgroundImage);
  }, [apiSettings]);

  // display
  return (
    <>
      <div ref={background} className="background"></div>
      <main ref={container} className="container minimize">
        {/* <div className="container__background"></div> */}
        <SearchBar
          setApiSettings={setApiSettings}
          setCity={setCity}
          setLocation={setLocation}
          setBackgroundImage={setBackgroundImage}
        />
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
        {city && isLoaded && <Forecast daily={weatherData.daily} />}
      </main>
    </>
  );
};

export default App;
