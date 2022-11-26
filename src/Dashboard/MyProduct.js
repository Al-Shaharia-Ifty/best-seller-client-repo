import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const MyProduct = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const url = `http://localhost:5000/my-product`;
  const { data: products, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => {
        console.log("res", res);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>advertised</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((o, i) => (
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
                    <button onClick={handleSubmit} className="btn">
                      pay
                    </button>
                  </td>
                )}
                {o?.status === "sold" ? (
                  <td>
                    <p className="text-green-600">Sold</p>
                  </td>
                ) : (
                  <td>
                    <button className="btn">Sold</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
