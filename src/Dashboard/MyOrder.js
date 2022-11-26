import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const MyOrder = () => {
  const url = `http://localhost:5000/order`;
  const { data: orders, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          signOut(auth);
          localStorage.removeItem("accessToken");
        }),
  });
  if (isLoading) {
    return <Loading />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <div>
      <div className="bg-base-200 ">
        <div className="overflow-x-auto">
          <table className="table w-full ">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <img className="w-20" src={o.img} alt="" />
                  </td>
                  <td>{o.name}</td>
                  <td>{o.resalePrice}</td>
                  {o.paid ? (
                    <td>
                      <p className="text-green-600">Paid</p>
                    </td>
                  ) : (
                    <td>
                      <button onClick={handleSubmit} className="btn">
                        pay
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
