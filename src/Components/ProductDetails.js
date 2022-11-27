import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import bluetik from "../Assets/Twitter_Verified_Badge.svg.png";
import BookModal from "./Modal/BookModal";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Shared/Firebase.init";

const ProductDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user] = useAuthState(auth);
  const data = useLoaderData();
  const {
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
                    <p className="ml-2">"not Verified"</p>
                  )}
                </span>
              </div>
              <p>Product Condition: {condition}</p>
              <p>Brand Name: {brand}</p>
            </div>
            <label
              htmlFor="book-modal"
              onClick={() => setOpenModal(name)}
              className="btn border-0 bg-gradient-to-l from-blue-900 to-purple-900"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
      {openModal && (
        <BookModal data={data} setOpenModal={setOpenModal} user={user} />
      )}
    </div>
  );
};

export default ProductDetails;
