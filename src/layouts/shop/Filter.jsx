import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

export default function Filter({
  setCategoryOptions,
  setTagsOptions,
  setSizesOptions,
  setColorsOptions,
  setMinPrice,
  minPrice,
  setMaxPrice,
  maxPrice,
  isNew,
  setIsNew,
}) {
  const categories = useSelector((state) => state.filter.categories);

  const categoryOptionsData = useMemo(() => {
    return categories?.map((e) => ({
      value: e.categoryName,
      label: e.categoryName,
    }));
  }, [categories]);

  const onChangeCategory = (option) => {
    const categoryNames = [...option];
    setCategoryOptions(categoryNames);
  };
  const tags = useSelector((state) => state.filter.tags);
  const tagsOptionsData = useMemo(() => {
    return tags?.map((e) => ({
      value: e.tagName,
      label: e.tagName,
    }));
  }, [tags]);

  const onChangeTags = (option) => {
    const tagNames = [...option];
    setTagsOptions(tagNames);
  };

  const sizes = useSelector((state) => state.filter.sizes);
  const sizesOptionsData = useMemo(() => {
    return sizes?.map((e) => ({
      value: e.sizeName,
      label: e.sizeName,
    }));
  }, [sizes]);

  const onChangeSizes = (option) => {
    const sizeNames = [...option];
    setSizesOptions(sizeNames);
  };

  const colors = useSelector((state) => state.filter.colors);

  const onChangeColors = (option) => {
    const colorNames = [...option];
    setColorsOptions(colorNames);
  };
  // const handleCheckboxChange = () => {
  //   setIsNew(!isNew);
  // };
  return (
    <div className="bg-[#F9F1E7] py-5 flex justify-center border border-t-[1px] border-t-color-gray-4">
      <div className="w-[85%] gap-5 grid min-[640px]:grid-cols-4 md:grid-cols-4 min-[1024px]:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-7">
        <div className="flex flex-col gap-2">
          <p>Category</p>
          <Select
            options={categoryOptionsData}
            isMulti
            onChange={onChangeCategory}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tag</p>
          <Select options={tagsOptionsData} isMulti onChange={onChangeTags} />
        </div>
        <div className="flex flex-col gap-2">
          <p>Size</p>
          <Select options={sizesOptionsData} isMulti onChange={onChangeSizes} />
        </div>
        <div className="flex flex-col gap-2">
          <p>Color</p>
          <Select
            options={colors.map((color) => ({
              value: color.colorHexCode,
              label: (
                <div
                  style={{ backgroundColor: color.colorHexCode }}
                  className="w-full h-4"
                ></div>
              ),
            }))}
            isMulti
            onChange={onChangeColors}
          />
        </div>
        <div className="flex flex-col gap-2 w-[120px] min-w-full">
          <p>Min. price</p>
          <input
            type="text"
            value={minPrice}
            placeholder="Rs. 200"
            className="px-3 py-[7px] w-full"
            onChange={(e) => {
              setMinPrice(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-[120px] min-w-full">
          <p>Max. price</p>
          <input
            type="text"
            value={maxPrice}
            className="px-3 py-[7px] w-full"
            placeholder="Rs. 3000"
            onChange={(e) => {
              setMaxPrice(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>New</p>
          <select
            onChange={(e) =>(setIsNew(e.target.value))}
            className="w-[150px]  py-2  px-3 text-[14px] lg:text-[16px]"
            id="isNew"
            name="isNew"
          >
            <option value="both">Both</option>
            <option value="true">New</option>
            <option value="false">Old</option>
          </select>
      
        </div>
      </div>
    </div>
  );
}
