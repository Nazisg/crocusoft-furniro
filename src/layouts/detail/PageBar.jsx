import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";


export default function PageBar({ productInfo }) {
  return (
    <div className="bg-[#F9F1E7] flex justify-center pt-[70px]">
      {
        productInfo && (
          <div className="w-[85%] flex items-center gap-4 py-4 lg:py-7 text-[14px] lg:text-[16px]">
            <Link to="/" className="text-[#9F9F9F]">Home</Link>
            <img className="w-[17px]" src={arrow} />
            <Link to="/shop" className="text-[#9F9F9F]">Shop</Link>
            <img className="w-[17px]" src={arrow} />
            <div className="p-[1px] h-full bg-[#9F9F9F]"></div>
            <span>{productInfo.title}</span>
          </div>
        )
      }
    </div>
  );
}
