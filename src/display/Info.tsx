import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import AdvancedInfo from "./AdvancedInfo";
import Alert from "../Alert";
import Info__header from "./Info__header";
import { unixToUtcDate } from "../utils/Functions";

interface IInfo {
  weatherData: any;
  city: string;
  isBasicDisplay: boolean;
  day: number;
  units: string;
}

const Info: React.FC<IInfo> = ({
  weatherData,
  city,
  isBasicDisplay,
  day,
  units,
}) => {
  const [isAlertsDisplayed, setIsAlertsDisplayed] = useState(false);
  const dateString = unixToUtcDate(weatherData.daily[day].dt);

  return (
    <section className="info">
      <Info__header city={city} date={dateString} />
      {isBasicDisplay ? (
        <BasicInfo
          temperature={
            day === 0
              ? weatherData.current.temp
              : weatherData.daily[day].temp.day
          }
          description={weatherData.daily[day].weather[0].description}
          icon={
            day === 0
              ? weatherData.current.weather[0].icon
              : weatherData.daily[day].weather[0].icon
          }
          city={city}
          alerts={weatherData.alerts}
          setIsAlertsDisplayed={setIsAlertsDisplayed}
          units={units}
        />
      ) : (
        <AdvancedInfo
          weatherData={weatherData}
          city={city}
          day={day}
          units={units}
        />
      )}
      {isAlertsDisplayed && (
        <Alert
          alerts={weatherData.alerts}
          setIsAlertsDisplayed={setIsAlertsDisplayed}
        />
      )}
    </section>
  );
};

export default Info;
