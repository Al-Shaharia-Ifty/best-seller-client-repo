import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { useForm } from "react-hook-form";
import Loading from "../Shared/LoadingPage";
import auth from "../Shared/Firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import useType from "../hooks/useType";

const Login = () => {
  const [role] = useState("Buyer");
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  let location = useLocation();
  const [token] = useToken(googleUser || user);
  const [done] = useType(role);

  let from = location.state?.from?.pathname || "/";
  let signInErrorMessage;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (token && done) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from, done]);

  if (loading || googleLoading) {
    return <Loading />;
  }
  if (error || googleError) {
    signInErrorMessage = (
      <p className="text-red-500 mb-2">
        {error?.message || googleError?.message}
      </p>
    );
  }
  const handleLogin = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(handleLogin)} className="card-body pb-0">
            <h2 className="text-4xl text-center">Login</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
              <label className="label">
                <Link to="/sign-up" className="label-text-alt link link-hover">
                  Don't Have an Account
                </Link>
              </label>
              {signInErrorMessage}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="card-body pt-0">
            <div className="divider">OR</div>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline w-full"
            >
              Continue with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
/*
const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, signInGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);

  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  const google = () => {
    signInGoogle().then((result) => {
      const email = result.user.email;
      setLoginUserEmail(email);
    });
  };
*/
