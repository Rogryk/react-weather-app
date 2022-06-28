import React from "react";
import xMark from "./assets/iconmonstr-x-mark-1.svg";

const Alert: React.FC<any> = ({ alerts, setIsAlertsDisplayed }) => {
  alerts && console.log(alerts);
  const startDate = new Date(alerts[0].start);
  const endDate = new Date(alerts[0].end);
  console.log(endDate);

  return (
    <div className="alert center">
      <button
        className="x-exit-btn"
        type="submit"
        onClick={() => {
          setIsAlertsDisplayed(false);
        }}
      >
        <img src={xMark} className="filter-white" />
      </button>
      {alerts.map((alert: any, index: number) => {
        return (
          <article key={index}>
            <h3 className="alert__title">{alert.tags[0]}</h3>
            <p className="alert__description">{alert.description}</p>
          </article>
        );
      })}
    </div>
  );
};

export default Alert;
