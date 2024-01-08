import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-bg bg-cover bg-fixed w-full h-[100vh] flex items-center justify-center pt-[85px]">
      <div className="w-90 flex justify-end">
        <div className="bg-[#FFF3E3] lg:w-1/2 p-9 flex flex-col items-start">
          <span className="font-medium tracking-[3px] text-[14px] lg:text-[16px]">New Arrival</span>
          <h1 className=" text-[27px] lg:text-[50px] leading-tight lg:leading-[65px] text-primary-color font-bold w-90">
            Discover Our New Collection
          </h1>
          <p className="text-[14px] lg:text-[18px] text-font-color font-medium mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to="/shop">
            <button className="bg-primary-color border shadow-lg border-primary-color mt-6 py-3 px-8 lg:px-14 lg:py-4  font-bold text-color-white text-[12px] lg:text-[14px]  hover:bg-[#FFF3E3] hover:text-primary-color hover:border hover:border-primary-color duration-300">
              BUY NOW
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
