import React from "react";
import { IForecastItem } from "../utils/types";
import "./style.css";

const Forecast__item: React.FC<IForecastItem> = ({
  icon,
  temperature,
  weekDay,
}) => {
  const iconPath = `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <article className="forecast__item">
      <div className="item__icon">
        <img src={iconPath}></img>
      </div>
      <p className="item__temperature">{temperature.toFixed(1)}</p>
      <p className="item__day">{weekDay}</p>
    </article>
  );
};

export default Forecast__item;