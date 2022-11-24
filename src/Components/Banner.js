import React from "react";
import job from "../Assets/job.png";

const Banner = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={job} className="max-w-sm rounded-lg" alt="" />
          <div>
            <h1 className="md:text-6xl text-3xl my-10 font-bold w-full lg:w-4/5">
              The Easiest Way to Get Your{" "}
              <span className="text-blue-500">Product</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
