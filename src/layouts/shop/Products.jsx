import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loading from "../../assets/icons/loading.gif";
import Card from "../../components/Card";
import { getFilterProducts } from "../../redux/features/filterSilce";
import Pagination from "../Pagination";
export default function Products({
  categoryOptions,
  tagsOptions,
  sizesOptions,
  colorsOptions,
  minPrice,
  maxPrice,
  isNew,
  takeProducts,
  orderByOption,
  currentPage,
  setCurrentPage,
}) {
  const dispatch = useDispatch();
  const { filterProducts } = useSelector((state) => state.filter);
  const { totalProductsCount } = useSelector((state) => state.filter);
  const status = useSelector((state) => state.filter.status);

  const totalPages = Math.ceil(totalProductsCount / takeProducts);

  useEffect(() => {
    dispatch(
      getFilterProducts({
        take: takeProducts,
        page: currentPage,
        isNew: isNew,
        categoryName: categoryOptions,
        productTags: tagsOptions,
        productSizes: sizesOptions,
        productColors: colorsOptions,
        minPrice: minPrice,
        maxPrice: maxPrice,
        orderBy: orderByOption,
        page: currentPage,
      })
    );
  }, [
    dispatch,
    categoryOptions,
    tagsOptions,
    sizesOptions,
    colorsOptions,
    minPrice,
    maxPrice,
    isNew,
    takeProducts,
    orderByOption,
    currentPage,
  ]);

  return (
    <section className="w-full flex justify-center items-center py-10">
      <div className="w-[85%] flex flex-col gap-8 items-center">
        {status === "loading" ? (
          <div className="flex justify-center">
            <img className="w-[100px]" src={loading} alt="Loading" />
          </div>
        ) : filterProducts?.length === 0 ? (
          <div className="text-[#898989]">
            The product you were looking for was not found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filterProducts?.map((e) => (
              <Card
                key={e?.id}
                id={e?.id}
                title={e?.title}
                img={e?.imageFiles}
                subTitle={e?.subTitle}
                discountedPrice={e?.discountedPrice}
                salePrice={e?.salePrice}
                discountPercent={e?.discountPercent}
                isNew={e?.isNew}
              />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}
