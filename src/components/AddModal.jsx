import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartItemdel from "../assets/icons/cartItemdel.svg";
import { closeAddModal } from "../redux/features/addModalSlice";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  setSelectedProduct,
} from "../redux/features/productSlice";
import { addItem } from "../redux/features/cartSlice";
import { addToCart, getAllCartItems } from "../redux/features/addToCartSlice";
import { useMemo } from "react";

export default function AddModal() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const userId = localStorage.getItem("userId");
  const userID_Int = useMemo(() => {
    if (userId) {
      return parseInt(userId);
    }
  }, [userId]);
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const dispatch = useDispatch();
  const {
    id,
    title,
    img,
    subTitle,
    discountedPrice,
    salePrice,
    discountPercent,
    isNew,
  } = useSelector((state) => state.addModal.product) || {};

  const handleCloseAddModal = () => {
    dispatch(closeAddModal());
    document.body.style.overflow = "auto";
  };
  const params = useParams();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  useEffect(() => {
    if (userID_Int) {
      dispatch(getAllCartItems(userID_Int));
    }
  }, [userID_Int, dispatch]);

  useEffect(() => {
    dispatch(setSelectedProduct(selectedProduct));
  }, [selectedProduct, dispatch]);

  const [activeColor, setActiveColor] = useState(null);
  useEffect(() => {
    if (selectedProduct?.colors?.length > 0) {
      setActiveColor(selectedProduct.colors[0]?.colorHexCode);
    }
  }, [selectedProduct]);

  const handleColorClick = (color, colorId) => {
    setActiveColor(color);
    setSelectedColorId(colorId);
  };
  ///active size
  const [activeSize, setActiveSize] = useState(null);
  useEffect(() => {
    if (selectedProduct?.sizes?.length > 0) {
      setActiveSize(selectedProduct?.sizes?.[0].sizeName);
    }
  }, [selectedProduct]);
  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  const handleAddToCart = (e) => {
    dispatch(
      addToCart({
        productId: selectedProduct.id,
        colorId: selectedColorId,
        userId: userID_Int,
        count: quantity,
      })
    );
    e.preventDefault();
    e.stopPropagation();
    handleCloseAddModal();
  };

  return (
    <div
      onClick={handleCloseAddModal}
      className="bg-[#0000005d] fixed top-0 left-0 w-full h-full flex justify-center items-center z-[99] "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="w-[300px] bg-color-white z-[98] p-7 m-4"
      >
        <div className="flex justify-end">
          <img
            src={cartItemdel}
            onClick={handleCloseAddModal}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-col">
            <h2 className="text-[23px] lg:text-[35px]">
              {selectedProduct?.title}
            </h2>
            <span className="text-[#9F9F9F] font-medium text-[18px] lg:text-[21px]">
              Rs. {selectedProduct?.discountedPrice?.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[#9F9F9F] text-sm">Size</span>
              <div className="flex gap-2 items-center">
                {selectedProduct?.sizes?.length > 0 &&
                  selectedProduct?.sizes?.map((e, idx) => (
                    <button
                      key={idx}
                      style={{
                        backgroundColor:
                          activeSize === e?.sizeName && "#B88E2F",
                        color: activeSize === e?.sizeName && "#ffff",
                      }}
                      className=" text-xs bg-[#F9F1E7]  w-[30px] h-[30px]  rounded-[5px]"
                      onClick={() => handleSizeClick(e?.sizeName)}
                    >
                      {e.sizeName}
                    </button>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#9F9F9F] text-sm">Color</span>
              <div className="flex gap-2">
                {selectedProduct?.colors?.length > 0 &&
                  selectedProduct?.colors?.map((e, idx) => {
                    return (
                      <button
                        key={idx}
                        style={{
                          backgroundColor: e?.colorHexCode,
                          border:
                            activeColor === e?.colorHexCode
                              ? "2px solid #000"
                              : "none",
                        }}
                        className={`w-[30px] h-[30px] rounded-full`}
                        onClick={() => handleColorClick(e?.colorHexCode, e?.id)}
                      ></button>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2 w-full">
            <div className="border border-[#9F9F9F] rounded-[10px] flex gap-6 py-2 px-4">
              <button onClick={decreaseQuantity}>-</button>
              <span className="font-medium">{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="border border-color-black rounded-[10px] text-[17px] w-full max-w-[180px] hover:text-color-white hover:bg-color-black duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
