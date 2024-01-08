import React from "react";
import trophy from "../assets/icons/trophy.svg";
import guarantee from "../assets/icons/guarantee.svg";
import shipping from "../assets/icons/shipping.svg";
import support from "../assets/icons/support.svg";

export default function Feature() {
    const db =[
        {
            id:1,
            img:trophy,
            name:"High Quality",
            desc:" crafted from top materials"
        },
        {
            id:2,
            img:guarantee,
            name:"Warranty Protection",
            desc:"Over 2 years"
        },
        {
            id:3,
            img:shipping,
            name:"Free Shipping",
            desc:"Order over 150 $"
        },
        {
            id:4,
            img:support,
            name:"24 / 7 Support",
            desc:"Dedicated support"
        }
    ]
  return (
    <section className="bg-[#FAF3EA] flex justify-center items-center py-16">
    <div className="w-[90%] justify-start items-center">
    <div className=" grid grid-cols-2 lg:grid-cols-4 items-center gap-3">
       {
        db.map((e)=>(
            <div key={e.id} className="flex gap-3 items-center max-[460px]:flex-col ">
            <img className="min-[320px]:w-[30px] sm:w-[35px] md:w-[40px] lg:w-[48px] " src={e.img} />
            <div className="flex flex-col max-[460px]:items-center">
              <h3 className="font-semibold text-[#242424] text-[15.5px] md:text-[20px] lg:text-[23px]">
                {e.name}
              </h3>
              <p className="font-medium text-[11.5px] md:text-[16px] lg:text-[18px] text-color-gray-3">
                {e.desc}
              </p>
            </div>
          </div>
        ))
       }

      </div>
    </div>
    </section>
  );
}
