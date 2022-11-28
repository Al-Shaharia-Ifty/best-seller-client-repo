import React from "react";
import Carousel from "react-multi-carousel";
import { useQuery } from "react-query";
import Loading from "../Shared/LoadingPage";
import "react-multi-carousel/lib/styles.css";
import ProductCart from "./ProductCart";

const AdvertisedItem = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1660 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1660, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { data: products, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      fetch(`https://seller-server.vercel.app/advertised`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {products.length > 0 && (
        <>
          <h2 className="text-3xl text-center my-10">Advertised Section</h2>
          <div>
            <Carousel
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              responsive={responsive}
              className="mx-10 mt-16 text-center z-10"
            >
              {products.map((p, i) => (
                <ProductCart key={i} p={p} />
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertisedItem;
