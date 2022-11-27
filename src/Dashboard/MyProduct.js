import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AdvertisedModal from "../Components/Modal/AdvertisedModal";
import SoldModal from "../Components/Modal/SoldModal";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const MyProduct = () => {
  const [openModal, setOpenModal] = useState(false);
  const [soldModal, setSoldModal] = useState(false);
  const navigate = useNavigate();
  const url = `http://localhost:5000/my-product`;
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order"],
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
                {o?.status === "sold" ? (
                  <td className="text-red-600">Not Available</td>
                ) : o.advertised === true ? (
                  <td className="text-green-600">Now Advertised</td>
                ) : (
                  <td>
                    <label
                      htmlFor="Advertised-modal"
                      onClick={() => setOpenModal(o)}
                      className="btn btn-outline"
                    >
                      Advertised
                    </label>
                  </td>
                )}
                {o?.status === "sold" ? (
                  <td>
                    <button className="btn btn-info">Available</button>
                  </td>
                ) : (
                  <td>
                    <label
                      htmlFor="sold-modal"
                      onClick={() => setSoldModal(o)}
                      className="btn btn-success"
                    >
                      Sold
                    </label>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openModal && (
        <AdvertisedModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          refetch={refetch}
        />
      )}
      {soldModal && (
        <SoldModal
          soldModal={soldModal}
          setSoldModal={setSoldModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MyProduct;
