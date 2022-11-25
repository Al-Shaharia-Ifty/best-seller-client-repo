import React from "react";
import AdvertisedItem from "../Components/AdvertisedItem";
import Banner from "../Components/Banner";
import ProductItems from "../Components/ProductItems";

const Home = () => {
  return (
    <div>
      <Banner />
      <AdvertisedItem />
      <ProductItems />
    </div>
  );
};

export default Home;
