import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const MyOrder = () => {
  const navigate = useNavigate();
  const url = `https://seller-server.vercel.app/order`;
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        return res.json();
      }),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="">
        <h2 className="text-2xl">My Orders</h2>
        <div className="overflow-x-auto">
          <table className="table w-full ">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((o, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <img className="w-20" src={o.img} alt="" />
                  </td>
                  <td>{o.name}</td>
                  <td>{o.resalePrice}</td>
                  {o?.paid ? (
                    <td>
                      <p className="text-green-600">Paid</p>
                    </td>
                  ) : (
                    <td>
                      <Link to={`/dashboard/payment/${o._id}`}>
                        <button className="btn btn-sm">pay</button>
                      </Link>
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
