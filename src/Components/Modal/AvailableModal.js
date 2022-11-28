import React from "react";
import Swal from "sweetalert2";

const AvailableModal = ({ availableModal, setAvailableModal, refetch }) => {
  const handleSubmit = () => {
    const url = `https://seller-server.vercel.app/available/${availableModal._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Product is now available", "", "success");
        setAvailableModal(false);
        refetch();
      });
  };
  return (
    <div>
      <input type="checkbox" id="available-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you really Available this product!
          </h3>
          <p className="py-4">{availableModal.name}</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Available
            </button>
            <label htmlFor="available-modal" className="btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableModal;
