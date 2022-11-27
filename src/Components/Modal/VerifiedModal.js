import React from "react";
import Swal from "sweetalert2";

const VerifiedModal = ({ verifiedUser, setVerifiedUser, refetch }) => {
  const handleSubmit = () => {
    const url = `http://localhost:5000/verified/${verifiedUser._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("User is now verified", "", "success");
        setVerifiedUser(false);
        refetch();
      });
  };
  return (
    <div>
      <input type="checkbox" id="verified-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you really Verified this user!
          </h3>
          <p className="py-4">{verifiedUser.displayName}</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Verified
            </button>
            <label htmlFor="verified-modal" className="btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedModal;
