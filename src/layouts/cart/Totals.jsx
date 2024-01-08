import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Totals() {
  const cartItems = useSelector((state) => state.addToCart.items);

  const subtotal = cartItems.reduce(
    (acc, e) => acc + (e?.cartItems?.[0]?.salePrice || 0),
    0
  );
  return (
    <div className="min-[320px]:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[50%] bg-[#F9F1E7] flex flex-col gap-7 pt-4 px-8 lg:px-12 pb-12">
      <h3 className="font-semibold text-[20px] md:text-[25px] lg:text-[30px] text-center">
        Cart Totals
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="font-medium">Subtotal</p>
          <p className="text-[#9F9F9F]"> Rs. {subtotal?.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Total</p>
          <p className="text-xl text-primary-color font-medium">
          Rs. {subtotal?.toFixed(2)}

          </p>
        </div>
      </div>
      <Link to={cartItems.length > 0 ? "/checkout" : "/cart"} className="flex justify-center items-center">
        <button className="lg:text-[18px] border border-color-black rounded-[15px] py-2 px-8 font-medium hover:bg-color-black hover:text-color-white duration-300">
          Check Out
        </button>
      </Link>
    </div>
  );
}
