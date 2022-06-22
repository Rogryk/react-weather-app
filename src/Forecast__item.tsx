import React from "react";

export interface IForecastItem {
  icon?: string;
  temperature: number;
}

const Forecast__item: React.FC<IForecastItem> = ({ icon, temperature }) => {
  const iconPath = `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <article className="forecast__item">
      <div className="item__icon">
        <img src={iconPath}></img>
      </div>
      <p className="item__temperature">{temperature}</p>
      <p className="item__day">monday</p>
    </article>
  );
};

export default Forecast__item;
