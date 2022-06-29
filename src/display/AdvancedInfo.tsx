import React from "react";

export interface IAdvancedInfo {
  weatherData: any;
  city: string;
  day: number;
}

const AdvancedInfo: React.FC<IAdvancedInfo> = ({ weatherData, city, day }) => {
  // console.log(weatherData.daily);

  return (
    <section className="advanced-info">
      {/* <div className="data-display-container"> */}
      <ul className="data-display-container">
        <li className="data celsius">
          wind chill: {weatherData.daily[day].feels_like.day}
        </li>
        <li className="data percent">
          humidity: {weatherData.daily[day].humidity}
        </li>
        <li className="data pascals">
          pressure: {weatherData.daily[day].pressure}
        </li>
        <li className="data kmh">
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
        <li className="data">sunrise:</li>
        <li className="data">sunset</li>
        <li className="data">moonrise:</li>
        <li className="data">moonset</li>
      </ul>
      {/* </div> */}
    </section>
  );
};

export default AdvancedInfo;
