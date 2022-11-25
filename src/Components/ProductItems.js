import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../Shared/LoadingPage";
import PrimaryButton from "../Shared/PrimaryButton";
import ProductCart from "./ProductCart";

const ProductItems = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_SERVER}/products`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) {
    return <Loading />;
  }
  const allBrand = products.map((b) => b.brand);
  const brand = allBrand.filter(
    (item, index) => allBrand.indexOf(item) === index
  );
  return (
    <div>
      <div>
        <h2 className="my-10 text-3xl text-center">Brand Name</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 md:gap-14 gap-5 lg:gap-20 mx-10">
          {brand.map((name, i) => (
            <div
              key={i}
              className="p-5 rounded-lg shadow-xl bg-gradient-to-l from-blue-900 to-purple-900 text-white"
            >
              <Link to={`../category/${name}`}>
                <h2 className="text-center text-xl font-semibold">{name}</h2>
              </Link>
            </div>
          ))}
        </div>
        <h2 className="text-3xl text-center my-8">Products</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-8 gap-4 mx-10">
          {products
            .slice(-6)
            .reverse()
            .map((p, i) => (
              <ProductCart key={i} p={p} />
            ))}
        </div>
        <div className="text-center">
          <Link to={"../all-products"}>
            <PrimaryButton>See All products</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
