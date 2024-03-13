import React from "react";

export default function RecentPostsCard({ img, header, createdDate }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <div className="min-w-[75px] w-[75px] h-[75px]">
          <img
            className="w-full h-full object-cover rounded-[10px]"
            src={img}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm">{header}</h4>
          <span className="text-[#9F9F9F] text-xs">
            {createdDate?.slice(0, 10)}
          </span>
        </div>
      </div>
    </div>
  );
}
