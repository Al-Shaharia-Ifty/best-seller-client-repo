import React from "react";
import { Link } from "react-router-dom";
import bluetik from "../Assets/Twitter_Verified_Badge.svg.png";

const ProductCart = ({ p }) => {
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
    condition,
    brand,
  } = p;
  return (
    <div>
      <div className="card card-compact bg-base-100 mx-3 shadow-lg">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="text-start p-3">
          <h2 className="card-title pb-3">{name}</h2>
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
                <p className="text-red-500 ml-2">Not Verified</p>
              )}
            </span>
          </div>
          <p>Product Condition: {condition}</p>
          <p>Brand Name: {brand}</p>
          <div className="card-actions justify-end pt-2">
            <Link to={`../product/${_id}`}>
              <button className="btn btn-primary">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
