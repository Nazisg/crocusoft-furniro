import React from "react";
export default function () {
  return (
    <footer className=" w-full bg-color-white border-t border-t-[#D8D8D8] flex justify-center">
      <div className=" flex w-[85%] flex-col py-4 lg:py-7">
        <div className="pb-7 grid gap-8 grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:gap-8">
            <h2 className="text-[20px] lg:text-[24px] font-bold">Funiro.</h2>
            <div className="[&>p]:text-[#9F9F9F] font-normal">
              <p className="text-[14px] lg:text-[16px]">400 University Drive Suite 200 Coral Gables,</p>
              <p className="text-[14px] lg:text-[16px]">FL 33134 USA</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-8 text-[14px] lg:text-[16px]">
            <h2 className="text-[#9F9F9F]">Links</h2>
            <a className="font-medium hover:text-primary-color">Home</a>
            <a className="font-medium hover:text-primary-color"> Shop</a>
            <a className="font-medium hover:text-primary-color">Contact</a>
          </div>
          <div className="flex flex-col gap-4 lg:gap-8 text-[14px] lg:text-[16px]">
            <h2 className="text-[#9F9F9F]">Help</h2>
            <a className="font-medium">Payment Options</a>
            <a className="font-medium"> Returns</a>
            <a className="font-medium">Privacy Policies</a>
          </div>
          <div className="flex flex-col gap-4 lg:gap-8 text-[14px] lg:text-[16px]">
            <h2 className="text-[#9F9F9F]">Newsletter</h2>
            <div className="flex lg:flex-row md:flex-row sm:flex-col min-[320px]:flex-col items-start gap-5">
              <input
                className="border-b border-b-font-color-1 text-[14px] lg:text-[16px] w-4/5 placeholder:text-[13px] lg:placeholder:text-[16px]"
                type="text"
                placeholder="Enter Your Email Address"
              />
              <button className="border-b border-b-font-color-1 pb-1 font-medium text-[12px] lg:text-[14px]">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-t-[#D9D9D9] pt-3 lg:pt-6 font-normal text-[14px] lg:text-[16px]">
          2023 furino. All rights reverved
        </div>
      </div>
    </footer>
  );
}
