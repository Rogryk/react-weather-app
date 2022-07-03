// TODO: add router

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
import { Loader } from "@mantine/core";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [location, setLocation] = useState<ILocation>({
    lon: "",
    lat: "",
  });
  const [units, setUnits] = useState<string>("metric");
  const [isBasicDisplay, setIsBasicDisplay] = useState(true);
  const [city, setCity] = useState<string>("");
  const [day, setDay] = useState<number>(0); //0 to 8
  const [changeBackgroundImage, setChangeBackgroundImage] =
    useState<boolean>(true);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "https://lh3.googleusercontent.com/places/AAcXr8rHqmrf_-XNRmNd90tZ6uu8CwknTUIAJ3nNHLO9-0NSmqfQnUPaJQ5X5t4alQl7dp_pCQqhQndDjUCFjrPEurD3rBsmVAu_uBI=s1600-w3280"
  );
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState<boolean>(true);
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
      changeBackgroundImage &&
        loadImage(backgroundImage).then(() => {
          setIsBackgroundLoaded(true);
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
    setIsLoaded(false);
    const apiLink =
      ApiSettings.link +
      `lat=${location.lat}&lon=${location.lon}&units=${units}&lang=${ApiSettings.lang}&appid=${ApiSettings.key}`;
    if (location.lon && location.lat) {
      setIsBackgroundLoaded(false);
      fetchData(apiLink);
      showDisplay();
    }
  }, [ApiSettings, location, units]);

  return (
    <>
      <img ref={refBackground} className="background" loading="lazy"></img>
      {!isBackgroundLoaded && changeBackgroundImage ? (
        <div className="background-loader">
          <Loader size={100} />
        </div>
      ) : (
        ""
      )}
      <main ref={refContainer} className="container minimize">
        <SearchBar
          setCity={setCity}
          setLocation={setLocation}
          setBackgroundImage={setBackgroundImage}
          setIsLoaded={setIsLoaded}
          isLoaded={isLoaded}
          changeBackgroundImage={changeBackgroundImage}
          setChangeBackgroundImage={setChangeBackgroundImage}
          setUnits={setUnits}
        />
        {city && isLoaded ? (
          <>
            <Tabs
              setIsBasicDisplay={setIsBasicDisplay}
              isBasicDisplay={isBasicDisplay}
            />
            <Info
              weatherData={weatherData}
              city={city}
              isBasicDisplay={isBasicDisplay}
              day={day}
              units={units}
            />
          </>
        ) : city ? (
          <Loading /> //TODO: fetch styling
        ) : (
          ""
        )}
        {city && isLoaded && (
          <Forecast daily={weatherData.daily} setDay={setDay} units={units} />
        )}
      </main>
    </>
  );
};

export default App;
