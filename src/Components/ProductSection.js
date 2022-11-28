import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Shared/LoadingPage";
import ProductCart from "./ProductCart";

const ProductSection = () => {
  const [products, setProducts] = useState(false);
  axios.get(`https://seller-server.vercel.app/products`).then((data) => {
    setProducts(data.data);
  });
  if (!products) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold my-10">Products</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-10">
        {products
          .slice(-6)
          .reverse()
          .map((p, i) => (
            <ProductCart p={p} key={i} />
          ))}
      </div>
      <div className="text-center">
        <Link to={"/all-products"}>
          <button className="btn my-10 border-0 bg-gradient-to-l from-blue-900 to-purple-900">
            See All Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
