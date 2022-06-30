import React from "react";
import { IForecastItem } from "../utils/types";
import "./style.css";

const Forecast__item: React.FC<IForecastItem> = ({
  icon,
  temperature,
  weekDay,
  setDay,
  index,
}) => {
  const iconPath = `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <article className="forecast__item" onClick={() => setDay(index)}>
      <div className="item__icon">
        <img src={iconPath}></img>
      </div>
      <p className="item__temperature celsius">{temperature.toFixed(1)}</p>
      <p className="item__day">{weekDay}</p>
    </article>
  );
};

export default Forecast__item;
