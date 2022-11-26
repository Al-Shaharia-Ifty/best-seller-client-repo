import React from "react";

const BookModal = ({ data, setOpenModal, user }) => {
  const { displayName, email } = user;
  const { _id, name, resalePrice } = data;
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };
  return (
    <div>
      <input type="checkbox" id="book-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="book-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg pt-2">{name}</h3>
          <p className="text-xl">Price: {resalePrice}Tk</p>
          <form onSubmit={handleSubmit} className="card-body py-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                value={displayName}
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
                value={email}
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Meeting Location</span>
              </label>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Number"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <button className="btn ">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
