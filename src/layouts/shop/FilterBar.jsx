import React from "react";
import filter from "../../assets/icons/filter.svg";
import grid from "../../assets/icons/grid.svg";
import list from "../../assets/icons/list.svg";

export default function FilterBar({
  setTakeProducts,
  takeProducts,
  setShowModal,
  showModal,
  setOrderByOption,
}) {
  return (
    <section className="bg-[#F9F1E7] py-4 w-full text-lg flex justify-center">
      <div className="w-[85%] flex lg:flex-row sm:flex-col min-[320px]:flex-col gap-5 lg:gap-3 justify-center lg:justify-between items-center">
        <div className="flex gap-6 ">
          <div
            className="flex gap-2 text-[16px] lg:text-[18px] cursor-pointer"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <img src={filter} className="w-full" />
            <p className="sm:flex min-[320px]:hidden"> Filter</p>
          </div>
          <img src={grid} className="sm:flex min-[320px]:hidden" />
          <img src={list} className="sm:flex min-[320px]:hidden" />
          <div className=" p-[1px] bg-[#9F9F9F]"></div>
          <p className="text-[14px] lg:text-[16px]">
            Showing 1–16 of 48 results
          </p>
        </div>
        <div className="flex gap-3 lg:gap-6 items-center">
          <div className="flex gap-2 lg:gap-4 items-center text-[16px] lg:text-[18px] ">
            Show{" "}
            <input
              className="p-2 w-[50px]"
              min={1}
              max={48}
              type="number"
              placeholder="16"
              value={takeProducts}
              onChange={(e) => {
                setTakeProducts(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-2 lg:gap-4 items-center text-[16px] lg:text-[18px] ">
            Sort by
            <select
              onChange={(e) => setOrderByOption(e.target.value)}
              className="sm:w-[200px] min-[320px]:w-[90px]  p-3 text-[14px] lg:text-[16px]"
              id="selectOption"
              name="selectOption"
            >
              <option value="select">Select</option>
              <option value="nameasc">A to Z</option>
              <option value="namedesc">Z to A</option>
              <option value="priceasc">Ascending Price</option>
              <option value="pricedesc">Descending Price</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
