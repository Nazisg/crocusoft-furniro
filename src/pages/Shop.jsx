import React, { useEffect, useState } from "react";
import FilterBar from "../layouts/shop/FilterBar";
import PageHeader from "../layouts/PageHeader";
import Products from "../layouts/shop/Products";
import Feature from "../layouts/Feature";
import Filter from "../layouts/shop/Filter";
import { useDispatch } from "react-redux";
import {
  fetchCategory,
  fetchTags,
  fetchSizes,
  fetchColors,
} from "../redux/features/filterSilce";
export default function Shop() {
  const dispatch = useDispatch();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [sizesOptions, setSizesOptions] = useState([]);
  const [colorsOptions, setColorsOptions] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [isNew, setIsNew] = useState("both");
  const [takeProducts, setTakeProducts] = useState(16);
  const [showModal, setShowModal] = useState(false);
  const [orderByOption, setOrderByOption] = useState("select")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchTags());
    dispatch(fetchSizes());
    dispatch(fetchColors());
  }, [dispatch]);

  return (
    <>
      <PageHeader page_name="Shop" title="Shop" />
      <FilterBar
        setTakeProducts={setTakeProducts}
        takeProducts={takeProducts}
        setShowModal={setShowModal}
        showModal={showModal}
        setOrderByOption={setOrderByOption}
      />
      {showModal ? (
        <Filter
          setCategoryOptions={setCategoryOptions}
          setTagsOptions={setTagsOptions}
          setSizesOptions={setSizesOptions}
          setColorsOptions={setColorsOptions}
          setMinPrice={setMinPrice}
          minPrice={minPrice}
          setMaxPrice={setMaxPrice}
          maxPrice={maxPrice}
          isNew={isNew}
          setIsNew={setIsNew}
          setCurrentPage={setCurrentPage}

        />
      ) : null}
      <Products
        categoryOptions={categoryOptions}
        tagsOptions={tagsOptions}
        sizesOptions={sizesOptions}
        colorsOptions={colorsOptions}
        minPrice={minPrice}
        maxPrice={maxPrice}
        isNew={isNew}
        takeProducts={takeProducts}
        orderByOption={orderByOption}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Feature />
    </>
  );
}
