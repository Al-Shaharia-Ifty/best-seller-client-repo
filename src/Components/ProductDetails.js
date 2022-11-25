import React from "react";
import { useLoaderData } from "react-router-dom";
import bluetik from "../Assets/Twitter_Verified_Badge.svg.png";
import PrimaryButton from "../Shared/PrimaryButton";

const ProductDetails = () => {
  const data = useLoaderData();
  const {
    _id,
    img,
    name,
    location,
    resalePrice,
    originalPrice,
    yearOfUse,
    time,
    sellerName,
    verified,
    brand,
  } = data;
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={img}
            className="max-w-sm w-96 rounded-lg shadow-2xl"
            alt=""
          />
          <div>
            <h1 className="text-5xl font-bold py-3">{name}</h1>
            <div className="text-xl mb-5">
              <p>Location: {location}</p>
              <p>Reseller Price: {resalePrice}</p>
              <p>Original Price: {originalPrice}</p>
              <p>Year Of Use: {yearOfUse}</p>
              <p>Post Time: {time}</p>
              <div className="flex items-center">
                <p>Seller Name: {sellerName}</p>{" "}
                <span>
                  {verified === "true" ? (
                    <img className="w-5 ml-2" src={bluetik} alt="" />
                  ) : (
                    "not Verified"
                  )}
                </span>
              </div>
              <p>Brand Name: {brand}</p>
            </div>
            <PrimaryButton>Book now</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
