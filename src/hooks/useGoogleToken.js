import { useEffect, useState } from "react";

const useGoogleToken = (gUser) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = gUser?.user?.email;
    if (email) {
      const url = `https://doctor-server-ruddy.vercel.app/user/${email}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [gUser]);
  return [token];
};

export default useGoogleToken;
