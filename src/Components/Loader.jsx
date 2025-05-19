import React from "react";
import "./spinner.css";
const Loader = () => {
  return (
    <div className="relative">
      <div className="spinner flex justify-center items-center absolute left-[195px] top-[195px]">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
