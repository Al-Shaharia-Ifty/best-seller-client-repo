import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [seller, setSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch("http://localhost:5000/seller", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSeller(data?.role);
          setSellerLoading(false);
        });
    }
  }, [email]);
  return [seller, sellerLoading, setSellerLoading];
};

export default useSeller;
