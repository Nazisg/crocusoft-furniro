import React from "react";
import admin from "../../assets/icons/admin.svg";
import calender from "../../assets/icons/calender.svg";
import tag from "../../assets/icons/tag.svg";

export default function BlogCard({
  img,
  adminInfo,
  createdDate,
  category,
  header,
  text,
}) {
  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="w-full h-[480px]">
        <img className="w-full h-full object-cover rounded-[10px]" src={img} />
      </div>{" "}
      <div className="flex gap-5 w-full max-[400px]:text-[14px] items-center">
        <div className="flex gap-1 lg:gap-2 text-[#9F9F9F]">
          <img src={admin} className="max-[400px]:w-[15px]" />
          {adminInfo}
        </div>
        <div className="flex gap-1 lg:gap-2 text-[#9F9F9F]">
          <img src={calender} className="max-[400px]:w-[15px]" />
          {createdDate?.slice(0, 10)}
        </div>
        <div className="flex gap-1  lg:gap-2 text-[#9F9F9F]">
          <img src={tag} className="max-[400px]:w-[14px]" />
          {category}
        </div>
      </div>
      <h2 className="font-medium text-[20px] sm:text-[25px] md:text-[30px] lg:text-[30px]">
        {header}
      </h2>
      <p className="text-[#9F9F9F] text-sm">{text}</p>
      <button className="border-b border-b-color-black text-color-black py-2 px-3 hover:bg-color-black hover:text-color-white duration-300">
        Read more
      </button>
    </div>
  );
}
