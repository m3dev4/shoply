import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/navigation.css'

import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/features/auth/authReducer";
import { useLoginMutation, useLogoutMutation } from "../redux/api/userApiSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showbar, setShowbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDrowdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCallApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutCallApi().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${showbar ? "hidden" : "flex"} 
    xl:flex lg:flex md:flex  flex-col justify-between p-4
    text-white bg-cyan-950 w-4 hover:w-[15%] h-screen fixed`}
    id="navigation-container" >
      <div>
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2 "
        >
          <AiOutlineHome className="mr-2 mt-[3rem] size={26} " />
          <span className=" mt-[3rem] text-white">Accueil</span>
          {""}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2 "
        >
          <AiOutlineShopping className="mr-2 mt-[3rem] size={33} " />
          <span className=" mt-[3rem] text-white">Boutique</span>
          {""}
        </Link>
        <Link to="/cart" className="flex relative ">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mr-2 mt-[3rem] size={26} " />
            <span className=" mt-[3rem] text-white">Carte</span>
            {""}
          </div>
        </Link>
        <Link to="/favorite" className="flex relative ">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mr-2 mt-[3rem] size={26} " />
            <span className=" mt-[3rem] text-white">Favorite</span>
            {""}
          </div>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDrowdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Produits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Catégories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Commandes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Utilisateurs
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Deconnecter
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="text-white">Se Conecter</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="text-white">S'inscrire</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
