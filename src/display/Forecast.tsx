import React from "react";
import Forecast__item from "./Forecast__item";
import { WEEK_DAYS } from "../utils/Constants";
import "./style.css";

const Forecast: React.FC<any> = (props) => {
  const date = new Date();

  return (
    <section className="forecast">
      {props.daily.slice(0, 7).map((day: any, index: number) => {
        return (
          <Forecast__item
            key={index}
            temperature={day.temp.day}
            icon={day.weather[0].icon}
            weekDay={
              WEEK_DAYS[date.getDay() + index] ||
              WEEK_DAYS[date.getDay() + index - 7]
            }
          />
        );
      })}
    </section>
  );
};

export default Forecast;
