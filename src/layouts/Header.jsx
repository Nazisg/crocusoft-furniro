import React, { useEffect } from "react";
import logo from "../assets/icons/logo.svg";
import person from "../assets/icons/person.svg";
import search from "../assets/icons/search.svg";
import heart from "../assets/icons/header-heart.svg";
import cart from "../assets/icons/cart.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuData from "../db/MenuData";
import { openModal } from "../redux/features/modalSlice";
import { openModalMenu } from "../redux/features/menuModalSlice";
import { FiMenu } from "react-icons/fi";
import { getAllCartItems } from "../redux/features/addToCartSlice";
import { useMemo } from "react";
export default function Header() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("jwtToken");
  const items = useSelector((state) => state.addToCart.items);
  const pathLocation = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathLocation.pathname]);

  const userId = localStorage.getItem("userId");
  const userID_Int = useMemo(() => {
    if (userId) {
      return parseInt(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userID_Int) {
      dispatch(getAllCartItems(userID_Int));
    }
  }, [userID_Int]);

  const handleOpenModal = () => {
    dispatch(openModal());
    document.body.style.overflow = "hidden";
  };

  const handleOpenModalMenu = () => {
    dispatch(openModalMenu());
    document.body.style.overflow = "hidden";
  };
  return (
    <header className=" w-full py-4 flex justify-center items-center fixed bg-color-white z-50 bg-bottom	shadow-md">
      <div className="w-90 flex justify-between items-center">
        <Link to="/">
          <div className="flex  gap-2 lg:gap-3 items-center">
            <img
              className="min-[320px]:w-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px]"
              src={logo}
            />
            <h1 className="font-bold sm:text-[21px] lg:text-[24px]">Furniro</h1>
          </div>
        </Link>
        <ul className="hidden gap-8 md:flex">
          {MenuData.map((e) => (
            <li key={e.to}>
              <NavLink
                activeclassname="active"
                className="hover:text-primary-color"
                to={e.to}
              >
                {e.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className=" md:flex hidden items-center gap-8">
          <Link to={`${userToken?.length ? "/profile" : "/login"}`}>
            <img src={person} className="w-5 cursor-pointer" />
          </Link>
          <Link to="/search">
            <img src={search} className="w-5 cursor-pointer" />
          </Link>
          <Link to="/favorites">
            <img src={heart} className="w-5 cursor-pointer" />
          </Link>
          <div className="relative cursor-pointer" onClick={handleOpenModal}>
            <img src={cart} className="w-5 " />
            <div className="w-4 h-4 rounded-full bg-primary-color text-color-white absolute top-[-7px] right-[-7px] text-xs flex justify-center items-center">
              {items?.length || 0}
            </div>
          </div>
        </div>
        <div className="md:hidden" onClick={handleOpenModalMenu}>
          <FiMenu />
        </div>
      </div>
    </header>
  );
}
