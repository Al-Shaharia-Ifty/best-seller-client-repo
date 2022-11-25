import React, { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../Shared/Firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../Shared/LoadingPage";
import { useForm } from "react-hook-form";
import useToken from "../hooks/useToken";
import useType from "../hooks/useType";

const Signup = () => {
  const [role, setRole] = useState("Buyer");
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(user || googleUser);
  const [done] = useType(role);

  //
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let signInErrorMessage;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //
  useEffect(() => {
    if (token && done) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from, done]);

  //
  if (loading || googleLoading || updating) {
    return <Loading />;
  }
  if (error || googleError || updateError) {
    signInErrorMessage = (
      <p className="text-red-500 mb-2">
        {error?.message || googleError?.message || updateError?.message}
      </p>
    );
  }

  //
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl z-10">
          <div className="card-body">
            <h2 className="text-center text-3xl font-bold ">Sign UP</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">User Type</span>
                </label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled defaultValue>
                    Buyer
                  </option>
                  <option>Buyer</option>
                  <option>Seller</option>
                </select>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 characters or longer",
                    },
                  })}
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              {signInErrorMessage}
              <input
                className="btn w-full max-w-xs"
                value="login"
                type="submit"
              />
            </form>
            <p>
              <small>
                Already Have a Account?{" "}
                <Link to="/login" className="text-secondary">
                  Please Login
                </Link>{" "}
              </small>
            </p>
            <div className="divider">OR</div>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
