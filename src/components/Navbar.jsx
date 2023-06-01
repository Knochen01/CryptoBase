import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const [nav, setNav] = useState(false);
  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignout = async (e) => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">CrytoBase</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div>
          <Link to="/account" className="p-4">
            {user?.email}
          </Link>
          <button onClick={handleSignout}>Sign Out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText p-3 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* -----------------------------------Menu Icon----------------------------------- */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
      {/*----------------------------------- Mobile Menu----------------------------------- */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-100 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="border-b border-current  py-6">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNav} className="border-b border-current py-6">
            <Link to="/account">Account</Link>
          </li>
          <li className="border-b py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/signin">
            <button
              onClick={handleNav}
              className="w-full my-2 p-3 bg-primary text-primary border border-current rounded-2xl shadow-xl"
            >
              SignIn
            </button>
          </Link>
          <Link to="/signup">
            <button
              onClick={handleNav}
              className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
            >
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
