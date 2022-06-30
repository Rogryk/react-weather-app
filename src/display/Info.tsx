import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import AdvancedInfo from "./AdvancedInfo";
import Alert from "../Alert";
import Info__header from "./Info__header";

interface IInfo {
  weatherData: any;
  city: string;
  isBasicDisplay: boolean;
  day: number;
}

const Info: React.FC<IInfo> = ({ weatherData, city, isBasicDisplay, day }) => {
  const [isAlertsDisplayed, setIsAlertsDisplayed] = useState(false);
  const dateObject = new Date(weatherData.daily[day].dt * 1000);

  const dateString = `${dateObject.getUTCDate()}.${
    dateObject.getMonth() < 10
      ? "0" + (dateObject.getMonth() + 1)
      : dateObject.getMonth() + 1
  }.${dateObject.getFullYear()}`;
  // console.log(dateString);
  console.log(weatherData);

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
          description={weatherData.current.weather[0].description}
          icon={weatherData.current.weather[0].icon}
          city={city}
          alerts={weatherData.alerts}
          setIsAlertsDisplayed={setIsAlertsDisplayed}
        />
      ) : (
        <AdvancedInfo weatherData={weatherData} city={city} day={day} />
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
