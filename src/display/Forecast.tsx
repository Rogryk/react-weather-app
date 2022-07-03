import React from "react";
import Forecast__item from "./Forecast__item";
import { weekDayName } from "../utils/Functions";
import "./style.css";

export interface IForecast {
  daily: any;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  units: string;
}

const Forecast: React.FC<IForecast> = ({ daily, setDay, units }) => {
  return (
    <section className="forecast">
      {daily.slice(0, 7).map((day: any, index: number) => {
        console.log(daily);

        return (
          <Forecast__item
            key={index}
            temperature={day.temp.day}
            icon={day.weather[0].icon}
            weekDay={weekDayName(index)}
            setDay={setDay}
            units={units}
            index={index}
          />
        );
      })}
    </section>
  );
};

export default Forecast;
