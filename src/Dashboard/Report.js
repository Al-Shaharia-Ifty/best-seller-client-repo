import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import SoldModal from "../Components/Modal/SoldModal";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const Report = () => {
  const [soldModal, setSoldModal] = useState(false);
  const url = "http://localhost:5000/all-report";
  const {
    data: reports,
    isLoading,
    refetch,
  } = useQuery({
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
          Navigate("/");
        }
        return res.json();
      }),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>report</h2>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Product add by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((o, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <img className="w-20" src={o.img} alt="" />
                </td>
                <td>{o.name}</td>
                <td>{o.email}</td>
                <td>
                  <label
                    htmlFor="sold-modal"
                    onClick={() => setSoldModal(o)}
                    className="btn btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default Report;
