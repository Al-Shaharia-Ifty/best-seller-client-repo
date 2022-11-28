import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import DeleteUserModal from "../Components/Modal/DeleteUserModal";
import VerifiedModal from "../Components/Modal/VerifiedModal";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const AllSeller = () => {
  const url = "https://seller-server.vercel.app/all-sellers";
  const {
    data: sellers,
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
  const [verifiedUser, setVerifiedUser] = useState(null);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>All Seller</h2>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((o, i) => (
              <tr key={i}>
                <th>{i + 1}</th>

                <td>{o.displayName}</td>
                <td>{o.email}</td>
                {o.verified === "true" ? (
                  <td>User is Verified</td>
                ) : (
                  <td>
                    <label
                      htmlFor="verified-modal"
                      onClick={() => setVerifiedUser(o)}
                      className="btn btn-info"
                    >
                      Verified
                    </label>
                  </td>
                )}
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
      </div>
      {verifiedUser && (
        <VerifiedModal
          verifiedUser={verifiedUser}
          setVerifiedUser={setVerifiedUser}
          refetch={refetch}
        />
      )}
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

export default AllSeller;
