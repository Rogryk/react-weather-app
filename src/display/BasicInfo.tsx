import React from "react";
import { IBasicInfo } from "../utils/types";
import "./style.css";
import alertIcon from "../assets/icons8-alert-32.png";

const BasicInfo: React.FC<IBasicInfo> = ({
  temperature,
  description,
  icon,
  city,
  alerts,
  setIsAlertsDisplayed,
}) => {
  return (
    <section className="basic-info">
      <p className="basic-info__temperature">{temperature.toFixed(1)}</p>
      {alerts && (
        <button
          type="submit"
          className="alert-button"
          onClick={() => {
            setIsAlertsDisplayed(true);
          }}
        >
          <img src={alertIcon} alt="alert-icon" />
        </button>
      )}
      <article className="basic-info__description">{description}</article>
    </section>
  );
};

export default BasicInfo;
