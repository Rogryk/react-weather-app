import React from "react";

export interface IInfo__Header {
  city: string;
  date: string;
}

const Info__header: React.FC<IInfo__Header> = ({ city, date }) => {
  return (
    <div className="text-white">
      <h2 className="city city_small">{city}</h2>
      <h3 className="date center-text-hor text-small">{date}</h3>
    </div>
  );
};

export default Info__header;
