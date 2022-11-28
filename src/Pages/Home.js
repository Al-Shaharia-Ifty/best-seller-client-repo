import React from "react";
import AdvertisedItem from "../Components/AdvertisedItem";
import Banner from "../Components/Banner";
import ProductItems from "../Components/ProductItems";
import ProductSection from "../Components/ProductSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <AdvertisedItem />
      <ProductItems />
      <ProductSection />
    </div>
  );
};

export default Home;
