import React from "react";
import { useLoaderData } from "react-router-dom";

const AllBuyer = () => {
  const buyers = useLoaderData();
  return (
    <div>
      <h2>All Buyer</h2>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((o, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <img className="w-20" src={o.img} alt="" />
                </td>
                <td>{o.name}</td>
                <td>{o.resalePrice}</td>
                {o?.paid ? (
                  <td>
                    <p className="text-green-600">Paid</p>
                  </td>
                ) : (
                  <td>
                    <button onClick={""} className="btn">
                      pay
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyer;
