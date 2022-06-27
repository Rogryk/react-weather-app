import React from "react";
import { IWeather } from "./store/types";
import { IBasicInfo } from "./store/Interface";

const BasicInfo: React.FC<IBasicInfo> = ({
  alerts,
  temperature,
  description,
  icon,
  city,
}) => {
  return (
    <section className="basic-info">
      <h2 className="basic-info__city">{city}</h2>{" "}
      <p className="basic-info__temperature">{temperature.toFixed(1)}</p>
      <article className="basic-info__description">{description}</article>
    </section>
  );
};

export default BasicInfo;
