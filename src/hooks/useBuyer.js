import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [buyer, setBuyer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch("http://localhost:5000/buyer", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBuyer(data.role);
          setLoading(false);
        });
    }
  }, [email]);
  return [buyer, loading];
};

export default useBuyer;
