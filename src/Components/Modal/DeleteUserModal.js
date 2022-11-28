import React from "react";
import Swal from "sweetalert2";

const DeleteUserModal = ({ deleteSeller, setDeleteSeller, refetch }) => {
  const handleSubmit = () => {
    const url = `http://localhost:5000/delete-user/${deleteSeller._id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Delete User SuccessFull", "", "success");
        setDeleteSeller(false);
        refetch();
      });
  };
  return (
    <div>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you really Delete this user!
          </h3>
          <p className="py-4">{deleteSeller.displayName}</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Delete
            </button>
            <label htmlFor="delete-modal" className="btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
