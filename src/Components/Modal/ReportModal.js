import React from "react";
import Swal from "sweetalert2";

const ReportModal = ({ reportModal, setReportModal }) => {
  const handleSubmit = () => {
    const url = `https://seller-server.vercel.app/report/${reportModal._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Product report Successfully", "", "success");
        setReportModal(false);
      });
  };
  return (
    <div>
      <input type="checkbox" id="report-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you really Report this Product!
          </h3>
          <p className="py-4">{reportModal.name}</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Report
            </button>
            <label htmlFor="report-modal" className="btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
