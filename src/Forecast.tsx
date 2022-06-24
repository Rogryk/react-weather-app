import React from "react";
import Forecast__item from "./Forecast__item";

export const WEEK_DAYS: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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
