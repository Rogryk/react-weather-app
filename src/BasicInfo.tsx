import React from "react";
import { IWeather } from "./store/types";

export interface IBasicInfo {
  alerts: string;
  temperature: number;
  description: string;
  icon: string;
}

const BasicInfo: React.FC<IBasicInfo> = ({
  alerts,
  temperature,
  description,
  icon,
}) => {
  return (
    <section className="basic-info">
      <h2 className="basic-info__city">warszawa</h2>
      <p className="basic-info__temperature">{temperature}</p>
      <article className="basic-info__description">{description}</article>
    </section>
  );
};

export default BasicInfo;
