import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../Shared/Firebase.init";
import Loading from "../Shared/LoadingPage";

const AddProduct = () => {
  const navigate = useNavigate();
  const time = new Date().toLocaleString();
  const [type, setType] = useState("Good");
  const [brand, setBrand] = useState("HP");
  const [findEmail] = useAuthState(auth);
  const email = findEmail?.email;

  const { data: user, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      fetch(`https://seller-server.vercel.app/user/${email}`).then((res) =>
        res.json()
      ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  if (isLoading) {
    return <Loading />;
  }

  const imageStorageKey = { key: process.env.REACT_APP_imageStorageKey };

  const onSubmit = async (data) => {
    const { email, verified } = user;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey.key}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const product = {
            img: img,
            name: data.productName,
            location: data.location,
            resalePrice: data.sellPrice,
            originalPrice: data.oriPrice,
            yearOfUse: data.use,
            time: time,
            sellerName: findEmail?.displayName,
            verified: verified,
            brand: brand,
            status: "available",
            advertised: false,
            report: false,
            condition: type,
            email: email,
          };
          console.log(product);
          fetch(`https://seller-server.vercel.app/product`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire("Product Add Successful", "", "success");
                reset();
                navigate("/dashboard/my-product");
              } else {
                Swal.fire("Failed to Add Product", "", "error");
              }
            });
        } else {
          Swal.fire("Failed to Add Product", "", "error");
        }
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-3xl font-bold">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="from-control w-ful max-w-xs">
                <label className="label">
                  <label className="label-text">Product Name</label>
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("productName", {
                    required: {
                      value: true,
                      message: "Product Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.productName?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.productName.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered w-full max-w-xs"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Image is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.image?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.image.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Type</span>
                </label>
                <select
                  onChange={(e) => setType(e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option defaultValue>Good</option>
                  <option>Fair</option>
                  <option>Excellent</option>
                </select>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Brand</span>
                </label>
                <select
                  onChange={(e) => setBrand(e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option defaultValue>HP</option>
                  <option>Dell</option>
                  <option>Lenovo</option>
                  <option>Asus</option>
                </select>
              </div>
              <div className="from-control w-ful max-w-xs">
                <label className="label">
                  <label className="label-text">Use of Year</label>
                </label>
                <input
                  type="text"
                  placeholder="Year"
                  className="input input-bordered w-full max-w-xs"
                  {...register("use", {
                    required: {
                      value: true,
                      message: "Year is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.use?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.use.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="from-control w-ful max-w-xs">
                <label className="label">
                  <label className="label-text">Your Location</label>
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  className="input input-bordered w-full max-w-xs"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Location is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.location?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.location.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="from-control w-ful max-w-xs">
                <label className="label">
                  <label className="label-text">Original Price</label>
                </label>
                <input
                  type="number"
                  placeholder="Original Price"
                  className="input input-bordered w-full max-w-xs"
                  {...register("oriPrice", {
                    required: {
                      value: true,
                      message: "Original Price is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.oriPrice?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.oriPrice.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="from-control w-ful max-w-xs">
                <label className="label">
                  <label className="label-text">Sell Price</label>
                </label>
                <input
                  type="number"
                  placeholder="Sell Price"
                  className="input input-bordered w-full max-w-xs"
                  {...register("sellPrice", {
                    required: {
                      value: true,
                      message: "Sell Price is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.sellPrice?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.sellPrice.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="from-control w-ful max-w-xs">
                <label className="label">
                  <label className="label-text">Mobile Number</label>
                </label>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  className="input input-bordered w-full max-w-xs"
                  {...register("mobile", {
                    required: {
                      value: true,
                      message: "Number is Required",
                    },
                    minLength: {
                      value: 11,
                      message: "Must be 11 Number or longer",
                    },
                  })}
                />
                <label className="label">
                  {errors.mobile?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.mobile.message}
                    </span>
                  )}
                  {errors.mobile?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.mobile.message}
                    </span>
                  )}
                </label>
              </div>
              <input
                type="submit"
                value="Add Product"
                className="btn w-full mx-w-xs"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
