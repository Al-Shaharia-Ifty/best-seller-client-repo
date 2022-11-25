import { useEffect, useState } from "react";
import auth from "../Shared/Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const useType = (role) => {
  const [done, setDone] = useState(null);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const userType = { role: role, verified: "false" };
  useEffect(() => {
    if (email) {
      const url = `http://localhost:5000/user/type/${email}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userType),
      })
        .then((res) => res.json())
        .then((data) => {
          setDone(data);
        });
    }
  }, [email]);
  return [done];
};

export default useType;
