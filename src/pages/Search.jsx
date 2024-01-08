import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loading from "../assets/icons/loading.gif";
import logo from "../assets/icons/logo.svg";
import Card from "../components/Card";
import {
  fetchData,
  selectData,
  selectError,
  selectInputValue,
  selectStatus,
  setInputValue,
} from "../redux/features/searchSlice";

export default function Search() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const inputValue = useSelector(selectInputValue);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchData(inputValue));
  }, [inputValue, dispatch]);

  const handleChange = (e) => {
    dispatch(setInputValue(e.target.value));
  };

  return (
    <div>
      <section className="page-bg bg-cover w-full h-[220px] md:h-[260px] lg:h-[288px] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center mt-10 w-full">
          <img className="w-[35px] md:w-[40px] mb-1 lg:w-[45px]" src={logo} />
          <h2 className="lg:text-[48px] md:text-[40px] text-[35px] font-medium">
            Search
          </h2>
          <div className="flex items-center justify-center gap-1 lg:pt-3 w-[70%]">
            <input
              type="text"
              onChange={handleChange}
              value={inputValue}
              className="w-full py-1 lg:py-2 px-6 rounded-[20px] sm:placeholder:text-[14px]"
              placeholder="Search..."
            />
          </div>
        </div>
      </section>
      <div className="flex justify-center py-10">
        <div className="w-[85%]">
          {data?.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-2 py-6">
              <p className="text-[25px]">Sorry! No result found :( </p>
              <p className="text-color-gray-3 text-center">
                Try specifying the search term more precisely.
              </p>
            </div>
          )}
          {status === "loading" && (
            <div className="flex justify-center">
              <img className="w-[100px]" src={loading} />
            </div>
          )}
          {status === "failed" && <div>Error: {error}</div>}
          {status === "succeeded" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data?.map((e) => (
                <Card
                  key={e?.id}
                  id={e?.id}
                  title={e?.title}
                  img={e?.imageFiles.length > 0 && e?.imageFiles[0]}
                  subTitle={e?.subTitle}
                  discountedPrice={e?.discountedPrice}
                  salePrice={e?.salePrice}
                  discountPercent={e?.discountPercent}
                  isNew={e?.isNew}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
