import React from "react";
import { unixToUtcTime } from "../utils/Functions";

export interface IAdvancedInfo {
  weatherData: any;
  city: string;
  day: number;
  units: string;
}

const AdvancedInfo: React.FC<IAdvancedInfo> = ({
  weatherData,
  city,
  day,
  units,
}) => {
  return (
    <section className="advanced-info">
      <ul className="data-display-container">
        <li
          className={`data ${
            units === "metric" ? "metric-temp" : "imperial-temp"
          }`}
        >
          wind chill: {weatherData.daily[day].feels_like.day}
        </li>
        <li className="data percent">
          humidity: {weatherData.daily[day].humidity}
        </li>
        <li className="data pascals">
          pressure: {weatherData.daily[day].pressure}
        </li>
        <li
          className={`data ${
            units === "metric" ? "metric-speed" : "imperial-speed"
          }`}
        >
          wind speed: {weatherData.daily[day].wind_speed}
        </li>
        <li className="data milimeters">
          rain: {weatherData.daily[day].rain || 0}
        </li>
        <li className="data milimeters">
          snow: {weatherData.daily[day].snow || 0}
        </li>
        <li className="data percent">
          clouds: {weatherData.daily[day].clouds}
        </li>
        <li className="data">
          sunrise: {unixToUtcTime(weatherData.daily[day].sunrise)}
        </li>
        <li className="data">
          sunset: {unixToUtcTime(weatherData.daily[day].sunset)}
        </li>
        <li className="data">
          moonrise: {unixToUtcTime(weatherData.daily[day].moonrise)}
        </li>
        <li className="data">
          moonset: {unixToUtcTime(weatherData.daily[day].moonset)}
        </li>
      </ul>
      {/* </div> */}
    </section>
  );
};

export default AdvancedInfo;
