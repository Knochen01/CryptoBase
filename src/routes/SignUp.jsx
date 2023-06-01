import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const naviagte = useNavigate();
  const { signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }
    setError("");
    try {
      await signUp(email, password);
      naviagte("/account");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="font-bold text-2xl">Sign Up</h1>
        {error ? <p className="bg-red-300 p-3 my-2">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>Email</label>
            <div className="my-3 w-full relative rounded-2xl ">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl"
                type="email"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className="my-3 w-full relative rounded-2xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="bg-primary border border-input p-2 mb-4  mr-2 w-full shadow-xl rounded-2xl"
                type="password"
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <button className=" w-full md:max-w-[100px] bg-button text-btnText rounded-2xl p-2 shadow-xl my-2">
            Sign up
          </button>
        </form>
        <p className="my-4">
          Have an account?
          <Link className="text-accent ml-2" to="/signin">
            Sign in{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
