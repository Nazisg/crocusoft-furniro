import React from "react";
import PageHeader from "../layouts/PageHeader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
export default function Favorites() {
  const addToFavorites = useSelector((state) => state.cart.favorites);
  return (
    <section>
      <PageHeader title="Favorites" page_name="Favorites" />
      <div className="w-full flex justify-center items-center flex-col py-7 gap-7">
        <div className="w-[85%] flex flex-col gap-7 justify-center">
          {addToFavorites?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
              {addToFavorites?.map((e) => (
                  <Card
                    key={e?.id}
                    id={e?.id}
                    title={e?.title}
                    img={e?.img}
                    subTitle={e?.subTitle}
                    discountedPrice={e?.discountedPrice}
                    salePrice={e?.salePrice}
                    discountPercent={e?.discountPercent}
                    isNew={e?.isNew}
                  />
                ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10 flex-col gap-3 w-full">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#FFF3E3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="#B88E2F"
                >
                  <path
                    d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z"
                    fill="#B88E2F"
                    stroke="#B88E2F"
                    stroke-width="1.8"
                  />
                </svg>
              </div>
              <span className="text-primary-color">
                Your Favorites List is Empty
              </span>
              <p className="text-sm text-color-gray-2 text-center">
                No product found for listening to favorites. You can choose the
                products you want by clicking the "Start Shopping" button.
              </p>
              <Link to="/shop">
                <button className="bg-primary-color py-2 px-10 text-color-white mt-5">
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
