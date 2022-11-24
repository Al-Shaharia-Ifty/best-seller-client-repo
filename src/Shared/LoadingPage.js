import React from "react";
import loadImg from "../Assets/loading.gif";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center relative">
      <img className="w-56" src={loadImg} alt="" />
    </div>
  );
};

export default Loading;
