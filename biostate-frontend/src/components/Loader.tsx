import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <ProgressBar
      visible={true}
      height="80"
      width="80"
      borderColor={"#D6FFFE"}
      barColor={"#D6FFFE"}
      ariaLabel="progress-bar-loading"
    />
  );
};

export default Loader;
