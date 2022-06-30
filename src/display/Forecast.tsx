import React from "react";
import Forecast__item from "./Forecast__item";
import { WEEK_DAYS } from "../utils/Constants";
import "./style.css";

export interface IForecast {
  daily: any;
  setDay: React.Dispatch<React.SetStateAction<number>>;
}

const Forecast: React.FC<IForecast> = ({ daily, setDay }) => {
  const date = new Date();

  return (
    <section className="forecast">
      {daily.slice(0, 7).map((day: any, index: number) => {
        return (
          <Forecast__item
            key={index}
            temperature={day.temp.day}
            icon={day.weather[0].icon}
            weekDay={
              WEEK_DAYS[date.getDay() + index - 1] ||
              WEEK_DAYS[date.getDay() + index - 8]
            }
            setDay={setDay}
            index={index}
          />
        );
      })}
    </section>
  );
};

export default Forecast;
