import React from "react";
import Forecast__item from "./Forecast__item";

const Forecast: React.FC<any> = (props) => {
  return (
    <section className="forecast">
      {props.daily.slice(0, 3).map((day: any, index: number) => {
        return (
          <Forecast__item
            key={index}
            temperature={day.temp.day}
            icon={day.weather[0].icon}
          />
        );
      })}
    </section>
  );
};

export default Forecast;
