import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/LoadingPage";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_PK);

const Payment = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      fetch(`https://seller-server.vercel.app/booking/${id}`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) {
    return <Loading />;
  }
  const { displayName, name, resalePrice } = product[0];

  return (
    <div>
      <h2 className="text-2xl text-center">Payment</h2>
      <div className="">
        <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
          <div className="card-body">
            <p className="text-success font-bold">Hello, {displayName}</p>
            <h2 className="card-title">Pay for {name}</h2>
            <p>Please pay: ${resalePrice}</p>
          </div>
        </div>
        <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm appointment={product[0]} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
