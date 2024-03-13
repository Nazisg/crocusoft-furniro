import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import share from "../assets/icons/share.svg";
import { openAddModal } from "../redux/features/addModalSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/features/cartSlice";
import { fetchProductById } from "../redux/features/productSlice";

export default function Card({
  title,
  img,
  subTitle,
  discountedPrice,
  salePrice,
  discountPercent,
  id,
  isNew,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddtoModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(fetchProductById(id));

    dispatch(
      openAddModal({
        id,
        title,
        img,
        subTitle,
        discountedPrice,
        salePrice,
        discountPercent,
        isNew,
      })
    );
    document.body.style.overflow = "hidden";
  };

  const isFavorite = useSelector((state) =>
    state.cart.favorites.some((favItem) => favItem && favItem.id === id)
  );

  const handleToggleFavorite = (e) => {
    if (isFavorite) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(removeFromFavorites({ id }));
    } else {
      e.preventDefault();
      e.stopPropagation();
      dispatch(
        addToFavorites({
          id,
          title,
          img,
          subTitle,
          discountedPrice,
          salePrice,
          discountPercent,
        })
      );
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share({
        title: "Web Share API Example",
        url: "https://example.com",
      });
      console.log("Successfully shared");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <div
      onClick={() => {
        navigate(`/product/${id}`);
      }}
      className="flex flex-col items-start group relative overflow-hidden w-full cursor-pointer shadow-md"
    >
      <img className="w-full h-72 object-cover object-center" src={img} />
      {discountPercent > 0 || isNew ? (
        <div
          className={`${
            isNew && discountPercent === 0
              ? "bg-[#2EC1AC]"
              : "bg-color-red-accents"
          } absolute top-3 right-3 w-12 h-12 text-color-white flex justify-center items-center rounded-full`}
        >
          {isNew && discountPercent === 0 ? "New" : `-${discountPercent}%`}
        </div>
      ) : null}
      <div className="w-full flex flex-col gap-1 p-4 bg-color-light-bg">
        <h4 className="text-color-gray-1 font-semibold text-[20px] text-ellipsis overflow-hidden w-full whitespace-nowrap">
          {title}
        </h4>
        <span className="text-color-gray-3 text-[15px] font-medium text-ellipsis overflow-hidden w-full whitespace-nowrap	">
          {subTitle}
        </span>
        <div className="flex gap-3 items-baseline">
          <p className="text-color-gray-1 font-semibold text-lg">
            Rs. {discountedPrice?.toFixed(2)}
          </p>
          <p className="text-color-gray-4 font-normal text-base line-through">
            {discountPercent != 0 ? `Rs. ${salePrice?.toFixed(2)}` : null}
          </p>
        </div>
        <div className="md:hidden">
          <div className=" flex gap-2 pt-2">
            <div
              className="flex gap-1 cursor-pointer"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <div className="flex gap-1 items-center bg-color-white  p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#B88E2F"
                  >
                    <path
                      d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z"
                      fill="#B88E2F"
                      stroke="#B88E2F"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex gap-1 items-center bg-color-white  p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z"
                      strokeWidth="1.8"
                      stroke="#B88E2F"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div
              className="flex gap-1 cursor-pointer bg-color-white  p-3"
              onClick={handleShare}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12 10.6667C11.4747 10.6667 11 10.8734 10.644 11.2047L5.94 8.46671C5.97333 8.31337 6 8.16004 6 8.00004C6 7.84004 5.97333 7.68671 5.94 7.53337L10.64 4.79337C11 5.12671 11.4733 5.33337 12 5.33337C13.1067 5.33337 14 4.44004 14 3.33337C14 2.22671 13.1067 1.33337 12 1.33337C10.8933 1.33337 10 2.22671 10 3.33337C10 3.49337 10.0267 3.64671 10.06 3.80004L5.36 6.54004C5 6.20671 4.52667 6.00004 4 6.00004C2.89333 6.00004 2 6.89337 2 8.00004C2 9.10671 2.89333 10 4 10C4.52667 10 5 9.79337 5.36 9.46004L10.0587 12.2054C10.0211 12.3563 10.0014 12.5112 10 12.6667C10 13.0623 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5145C11.6001 14.6658 12.0022 14.7054 12.3902 14.6283C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0569C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5359 13.44 11.2235 13.1111 11.0038C12.7822 10.784 12.3956 10.6667 12 10.6667Z"
                  fill="#B88E2F"
                />
              </svg>
            </div>
            <button
              onClick={handleAddtoModal}
              className="w-full py-2 px-6 text-color-white bg-primary-color font-semibold hover:bg-primary-color hover:text-color-white duration-300"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className=" absolute h-full w-full bg-[#3b3b3bb8]  min-[320px]:hidden sm:hidden md:flex lg:flex xl:flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex-col gap-5 h-auto w-auto flex items-center justify-center">
          <button
            onClick={handleAddtoModal}
            className="bg-color-white py-2 px-14 text-primary-color font-semibold hover:bg-primary-color hover:text-color-white duration-300"
          >
            Add to cart
          </button>
          <div className="flex gap-4 justify-between text-color-white items-center">
            <div className="flex gap-1 cursor-pointer" onClick={handleShare}>
              <img src={share} /> <p>Share</p>
            </div>
            <div
              className="flex gap-1 cursor-pointer"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <div className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#B88E2F"
                  >
                    <path
                      d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z"
                      fill="#B88E2F"
                      stroke="#B88E2F"
                      strokeWidth="1.8"
                    />
                  </svg>
                  <p className="text-primary-color">Unlike</p>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z"
                      stroke="white"
                      strokeWidth="1.8"
                    />
                  </svg>
                  <p>Like</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
