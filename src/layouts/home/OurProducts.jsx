import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import {
  fetchProducts,
  selectProducts,
  setShowProducts,
} from "../../redux/features/productSlice";

export default function OurProducts() {
  const dispatch = useDispatch();
  const { data, showProducts } = useSelector(selectProducts);

  const ShowMore = () => {
    if (showProducts < 48) {
      dispatch(setShowProducts(showProducts + 8));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts(showProducts));
  }, [showProducts, dispatch]);

  return (
    <section className="w-full flex justify-center items-center flex-col py-8 gap-7">
      <div className="w-[85%] flex flex-col gap-7 ">
        <p className="text-color-gray-1 text-center font-bold text-2xl lg:text-3xl">
          Our Products
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {data?.map((e) => (
            <Card
              key={e.id}
              id={e.id}
              title={e.title}
              img={e.imageFiles}
              subTitle={e.subTitle}
              discountedPrice={e.discountedPrice}
              salePrice={e.salePrice}
              discountPercent={e.discountPercent}
              isNew={e.isNew}
            />
          ))}
        </div>
      </div>
      {showProducts < 48 && (
        <button
          onClick={ShowMore}
          className="shadow-md border border-primary-color bg-color-white text-primary-color font-semibold py-1 px-7 lg:px-14 hover:bg-primary-color hover:text-color-white transition-all duration-300"
        >
          Show More
        </button>
      )}
    </section>
  );
}
