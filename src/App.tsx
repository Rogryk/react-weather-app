import React, { useState, useEffect, useRef } from "react";
import BasicInfo from "./BasicInfo";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import ApiSettings from "./store/Settings";
import { IApi, ILocation } from "./store/Interface";

const App: React.FC = () => {
  const [location, setLocation] = useState<ILocation>({
    lon: "",
    lat: "",
  });
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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
      loadImage(backgroundImage).then(() => {
        refBackground.current.style.backgroundImage = `url(${backgroundImage})`;
      });
    }
  };

  const loadImage = (src: string) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  useEffect(() => {
    const apiLink =
      ApiSettings.link +
      `lat=${location.lat}&lon=${location.lon}&units=${ApiSettings.unit}&lang=${ApiSettings.lang}&appid=${ApiSettings.key}`;
    if (location.lon && location.lat) {
      fetchData(apiLink);
      showDisplay();
    }
  }, [ApiSettings, location]);

  return (
    <>
      <img ref={refBackground} className="background" loading="lazy"></img>
      <main ref={refContainer} className="container minimize">
        {/* <div className="container__background"></div> */}
        <SearchBar
          setCity={setCity}
          setLocation={setLocation}
          setBackgroundImage={setBackgroundImage}
          setIsLoaded={setIsLoaded}
          isLoaded={isLoaded}
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
