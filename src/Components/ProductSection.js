import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../Shared/LoadingPage";
import ProductCart from "./ProductCart";

const ProductSection = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`http://localhost:5000/products`).then((res) => res.json()),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold my-10">Products</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-10">
        {products
          .slice(-6)
          .reverse()
          .map((p) => (
            <ProductCart p={p} />
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
