import React from "react";

const SoldModal = ({ openModal, setOpenModal, refetch }) => {
  const handleSubmit = () => {
    const url = `http://localhost:5000/advertised/${openModal._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpenModal(false);
        refetch();
      });
  };
  return (
    <div>
      <input type="checkbox" id="Advertised-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you really advertised this product!
          </h3>
          <p className="py-4">{openModal.name}</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Advertised
            </button>
            <label htmlFor="Advertised-modal" className="btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldModal;
