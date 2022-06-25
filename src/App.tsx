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
  const refContainer = useRef<any>(null);
  const refBackground = useRef<any>(null);

  const fetchData = async (apiLink: string) => {
    let response: any;
    try {
      response = await fetch(apiLink);
      const data = await response.json();
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      if (!data) {
        const message = `An error has occured: empty data`;
        throw new Error(message);
      }
      setWeatherData(data);
      setIsLoaded(true);
    } catch (error) {
      // alert("An error occured. Check your connection and try again later.");
      alert(error);
    }
  };

  const showDisplay = () => {
    if (refContainer.current != null) {
      refContainer.current.classList.remove("minimize");
      refBackground.current.style.backgroundImage = `url(${backgroundImage})`;
    }
  };

  useEffect(() => {
    const apiLink =
      apiSettings.link +
      `lat=${location.lat}&lon=${location.lon}&units=${apiSettings.unit}&lang=${apiSettings.lang}&appid=${apiSettings.key}`;
    if (location.lon && location.lat) {
      fetchData(apiLink);
      showDisplay();
    }
  }, [apiSettings]);

  // display
  return (
    <>
      <img ref={refBackground} className="background" loading="lazy"></img>
      <main ref={refContainer} className="container minimize">
        {/* <div className="container__background"></div> */}
        <SearchBar
          setApiSettings={setApiSettings}
          setCity={setCity}
          setLocation={setLocation}
          setBackgroundImage={setBackgroundImage}
          setIsLoaded={setIsLoaded}
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
