import React from "react";

const SoldModal = ({ soldModal, setSoldModal, refetch }) => {
  const handleSubmit = () => {
    const url = `http://localhost:5000/sold/${soldModal._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSoldModal(false);
        refetch();
      });
  };
  return (
    <div>
      <input type="checkbox" id="sold-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you really advertised this product!
          </h3>
          <p className="py-4">{soldModal.name}</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Advertised
            </button>
            <label htmlFor="sold-modal" className="btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldModal;
