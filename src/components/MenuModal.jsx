import React from "react";
import { closeModalMenu } from "../redux/features/menuModalSlice";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
import MenuData from "../db/MenuData";
import person from "../assets/icons/person.svg";
import search from "../assets/icons/search.svg";
import heart from "../assets/icons/header-heart.svg";
import cart from "../assets/icons/cart.svg";
import { useSelector } from "react-redux/es/hooks/useSelector";
export default function MenuModal() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleCloseModalMenu = () => {
    dispatch(closeModalMenu());
    document.body.style.overflow = "auto";
  };
  return (
    <div
      onClick={handleCloseModalMenu}
      className="bg-[#0000005d] fixed top-0 left-0 w-full h-full flex justify-end z-[99] "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="w-[360px] bg-color-white z-[98] p-7 m-4"
      >
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-2xl">Furniro</h1>
          <MdClose onClick={handleCloseModalMenu} />
        </div>
        <div className="flex flex-col gap-8 mt-5">
          <ul className=" gap-8 flex flex-col items-center">
            {MenuData.map((e) => (
              <li key={e.to}>
                <NavLink
                  activeclassname="active"
                  className="hover:text-primary-color"
                  to={e.to}
                  onClick={handleCloseModalMenu}
                >
                  {e.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex w-full justify-center">
            <div className="flex items-center gap-8">
              <Link to="/login" onClick={handleCloseModalMenu}>
                <img src={person} className="w-5 cursor-pointer" />
              </Link>
              <Link to="/search" onClick={handleCloseModalMenu}>
                <img src={search} className="w-5 cursor-pointer" />
              </Link>
              <Link to="/favorites" onClick={handleCloseModalMenu}>
                <img src={heart} className="w-5 cursor-pointer" />
              </Link>
              <Link to="/cart" onClick={handleCloseModalMenu}>
                <div className="relative cursor-pointer">
                  <img src={cart} className="w-5 " />
                  <div className="w-4 h-4 rounded-full bg-primary-color text-color-white absolute top-[-7px] right-[-7px] text-xs flex justify-center items-center">
                    {cartItems.length}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
