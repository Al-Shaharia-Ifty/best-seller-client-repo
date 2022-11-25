import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import ProductCart from "../Components/ProductCart";

const CategoryProduct = () => {
  const category = useParams();
  const data = useLoaderData();
  return (
    <div>
      <h2 className="text-3xl text-center my-10">
        Category Name{" "}
        <span className="text-blue-600 font-semibold">{category.name}</span>
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-10 gap-4">
        {data.map((p, i) => (
          <ProductCart key={i} p={p} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
