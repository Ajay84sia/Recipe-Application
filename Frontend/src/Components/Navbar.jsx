import React, { useContext } from "react";
import "./Navbar.css";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
const Navbar = () => {
  const { logout, isAuth } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    localStorage.removeItem("recipeToken");
    localStorage.removeItem("recipeUser");
    localStorage.removeItem("favoriteData");
  };
  return (
    <div className="antialiased bg-gray-400 w-screen fixed z-10">
      <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 dark:bg-gray-900 dark:text-white">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/">
            <h1 className="font-bold text-blue-600 text-2xl">Recipe App</h1>
          </Link>
        </div>

        <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
          <svg
            className="fill-current text-gray-900 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-center text-gray-700 pt-4 lg:pt-0 dark:text-white">
              <li>
                <Link
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
              {!isAuth ? (
                <li>
                  <Link
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li className="flex justify-center">
                  <button
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}

              <li>
                <Link
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2"
                  to="/favorites"
                >
                  <FiHeart className="border-black dark:border-white m-auto" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
