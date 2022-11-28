import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import DeleteUserModal from "../Components/Modal/DeleteUserModal";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const AllBuyer = () => {
  const url = "https://seller-server.vercel.app/all-buyers";
  const {
    data: buyers,
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
  const [deleteSeller, setDeleteSeller] = useState(null);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>All Buyer</h2>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((o, i) => (
              <tr key={i}>
                <th>{i + 1}</th>

                <td>{o.displayName}</td>
                <td>{o.email}</td>

                <td>
                  <label
                    htmlFor="delete-modal"
                    onClick={() => setDeleteSeller(o)}
                    className="btn btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      {deleteSeller && (
        <DeleteUserModal
          deleteSeller={deleteSeller}
          setDeleteSeller={setDeleteSeller}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllBuyer;
