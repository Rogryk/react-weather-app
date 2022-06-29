// TODO: change days on click at forecast item
// TODO: add router
// TODO: magnifier icon for search bar
// TODO: loading icon for search bar
// TODO: loading icon for background
// TODO: toggle background image
// TODO: toggle imperial
// FIXME: Uncaught ReferenceError: google is not defined
// FIXME: background image size (grey bar)

import React, { useState, useEffect, useRef } from "react";
import BasicInfo from "./display/BasicInfo";
import Forecast from "./display/Forecast";
import SearchBar from "./search/SearchBar";
import Loading from "./display/Loading";
import Alert from "./Alert";
import Tabs from "./Tabs";
import Info from "./display/Info";
import ApiSettings from "./utils/Settings";
import { IApi, ILocation } from "./utils/types";
import AdvancedInfo from "./display/AdvancedInfo";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [location, setLocation] = useState<ILocation>({
    lon: "",
    lat: "",
  });
  const [isBasicDisplay, setIsBasicDisplay] = useState(true);
  const [city, setCity] = useState<string>("");
  const [day, setDay] = useState<number>(0); //0 to 8
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const refContainer = useRef<any>(null);
  const refBackground = useRef<any>(null);

  // console.log(weatherData.daily);

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
        <SearchBar
          setCity={setCity}
          setLocation={setLocation}
          setBackgroundImage={setBackgroundImage}
          setIsLoaded={setIsLoaded}
          isLoaded={isLoaded}
        />
        {city && isLoaded ? (
          <>
            <Tabs setIsBasicDisplay={setIsBasicDisplay} />
            <Info
              weatherData={weatherData}
              city={city}
              isBasicDisplay={isBasicDisplay}
              day={day}
            />
          </>
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
