import React from "react";
import dining from "../../assets/images/dining.png";
import bedroom from "../../assets/images/bedroom.png";
import living from "../../assets/images/living.png";

export default function Range() {
  const rangeData = [
    { id: 1, name: "Dining", img: dining },
    { id: 2, name: "Living", img: living },
    { id: 3, name: "Bedroom", img: bedroom },
  ];
  return (
    <section className="flex justify-center gap-4 items-center py-10">
      <div className="w-[85%] flex flex-col gap-5">
        <div className="flex flex-col lg:gap-4 items-center">
          <p className="text-[22px] md:text-[24px] lg:text-[30px] text-font-color font-bold">
            Browse The Range
          </p>
          <p className="text-font-color-1 text-[14px]  md:text-[16px] lg:text-[18px] text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 text-font-color font-semibold">
          {rangeData.map((e) => (
            <div
              key={e.id}
              className="flex flex-col gap-4 [&>img]:w-90 items-center"
            >
              <img src={e.img} />
              <h3 className="text-[18px] md:text-[20px] lg:text-[22px]">{e.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
