import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import axios from "axios";
import { setAuthUser } from "../redux/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const authUser = useSelector((state) => state.userReducer?.authUser?.user);

  const handleClick = () => {
    axios
      .get("http://localhost:8000/user/logout", { withCredentials: true })
      .then((response) => {
        console.log("Logout successful:", response);
        dispatch(setAuthUser(null));
        navigateTo("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/home" className="text-white text-2xl font-bold">
            ScholarAll
          </Link>
          {!(authUser.isAdmin)?(<Link to="/applied" className="text-white text-small ml-[25px] font-bold">
            Applied
          </Link>):""}
        </div>

        {/* Links (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4">
          {authUser && (
            <span className="text-white">Hi, {authUser.fullName}</span>
          )}
          {authUser? (
            authUser.isAdmin && <Link
              to="/addScholarship"
              className="text-white hover:text-white px-3 py-2 rounded transition"
            >
              Add Scholarship
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition"
            >
              Login
            </Link>
          )}
          {authUser && (
            <button
              onClick={handleClick}
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            <AlignJustify className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <div className="flex flex-col items-start space-y-2">
          {authUser && (
            <span className="text-white">Hi, {authUser.fullName}</span>
          )}
          {authUser ? (
            <Link
              to="/addScholarship"
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition"
              onClick={toggleMenu}
            >
              Add Scholarship
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
          {authUser && (
            <button
              onClick={() => {
                handleClick();
                toggleMenu();
              }}
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
