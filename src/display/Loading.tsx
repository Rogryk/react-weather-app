import React from "react";
import { Loader } from "@mantine/core";
import "./style.css";

const Loading = () => {
  return (
    <div className="loading-box">
      {/* <h3>Loading...</h3> */}
      <Loader />
    </div>
  );
};

export default Loading;
