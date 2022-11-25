import React from "react";
import { useQuery } from "react-query";
import { useLoaderData, useParams } from "react-router-dom";
import ProductCart from "../Components/ProductCart";
import Loading from "../Shared/LoadingPage";

const CategoryProduct = () => {
  const category = useParams();
  const data = useLoaderData();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_SERVER}/category/${category.name}`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-3xl text-center my-10">
        Category Name{" "}
        <span className="text-blue-600 font-semibold">{category.name}</span>
      </h2>
      <div className="grid grid-cols-3 mx-10 gap-4">
        {data.map((p, i) => (
          <ProductCart key={i} p={p} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
