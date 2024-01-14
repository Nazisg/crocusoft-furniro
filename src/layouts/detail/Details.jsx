import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import facebook from "../../assets/icons/facebook.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import star from "../../assets/icons/star.svg";
import twitter from "../../assets/icons/twitter.svg";
import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/features/cartSlice";
import { useMemo } from "react";
import { addToCart } from "../../redux/features/addToCartSlice";
export default function Details({ productInfo }) {
  const [quantity, setQuantity] = useState(1);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [selectedColorId, setSelectedColorId] = useState(0);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  const userID_Int = useMemo(() => {
    if (userId) {
      return parseInt(userId);
    }
  }, [userId]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: selectedProduct.id,
        colorId: selectedColorId,
        userId: userID_Int,
        count: quantity,
      })
    );
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (!selectedColorId && productInfo?.colors?.length > 0) {
      setSelectedColorId(productInfo.colors[0]?.id);
    }
  }, [selectedColorId, productInfo]);
  
  ///color change
  const [mainImage, setMainImage] = useState(null);
  const [productColorIndex, setProductColorIndex] = useState(0);
  const [activeColor, setActiveColor] = useState(null);

  const ChangeImage = (newImage) => {
    setMainImage(newImage);
  };

  useEffect(() => {
    if (productInfo?.colors?.length > 0) {
      setMainImage(productInfo?.colors[productColorIndex]?.imageFiles[0]);
    }
  }, [productInfo, productColorIndex]);

  useEffect(() => {
    if (productInfo?.colors?.length > 0) {
      setActiveColor(productInfo.colors[0]?.colorHexCode);
    }
  }, [productInfo]);

  const handleColorClick = (color, index, colorId) => {
    setActiveColor(color);
    setProductColorIndex(index);
    setSelectedColorId(colorId);

  };

  ///active size
  const [activeSize, setActiveSize] = useState(null);
  useEffect(() => {
    if (productInfo?.sizes?.length > 0) {
      setActiveSize(productInfo?.sizes?.[0].sizeName);
    }
  }, [productInfo]);
  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  return (
    <div className="flex justify-center items-start py-6">
      {productInfo && (
        <div className="w-[85%] min-[320px]:flex-col flex sm:flex-col md:flex-col gap-8 lg:flex-row">
          <div className="flex gap-5 justify-center max-[500px]:flex-col-reverse">
            <div className="flex flex-col gap-5 ">
              <div className="flex gap-4 lg:w-[100px] md:w-[100px] sm:w-[100px] min-[500px]:w-[100px] max-[500px]:w-full max-[500px]:flex-row min-[500px]:flex-col ">
                {productInfo?.colors?.[productColorIndex].imageFiles.map(
                  (item, index) => (
                    <div
                      onClick={() => ChangeImage(item)}
                      key={index}
                      className="bg-[#F9F1E7] mb-2 rounded-[10px] w-full h-[4.7rem] flex justify-center items-center"
                    >
                      <img
                        src={item}
                        className="object-cover rounded-[10px] w-full h-full"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="bg-[#F9F1E7] rounded-[10px] lg:w-[26rem] min-[320px]:w-full sm:w-full md:w-full h-[27rem]  flex  justify-center items-center">
              {mainImage && (
                <img
                  src={mainImage}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="main-product-image"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3  pb-8">
            <h2 className="text-[30px] lg:text-[40px]">{productInfo.title}</h2>
            <span className="text-[#9F9F9F] font-medium text-[18px] lg:text-[21px]">
              Rs. {productInfo.salePrice}
            </span>
            <div className="flex gap-5">
              <div className="flex gap-1">
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
                <img src={star} />
              </div>
              <div className="p-[1px] w-[1px] h-[20px] bg-[#9F9F9F]"></div>
              <span className="text-[#9F9F9F] text-[13px]">
                5 Customer Review
              </span>
            </div>
            <p className="text-xs w-[80%] lg:w-[60%]  max-[500px]:w-full leading-5 mt-1">
              {productInfo.introduction}
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-[#9F9F9F] text-sm">Size</span>
              <div className="flex gap-2">
                {productInfo?.sizes?.length > 0 &&
                  productInfo?.sizes?.map((e, idx) => (
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
                {productInfo?.colors?.length > 0 &&
                  productInfo?.colors?.map((e, idx) => (
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
                      onClick={() => handleColorClick(e?.colorHexCode, idx, e?.id)}
                    ></button>
                  ))}
              </div>
            </div>
            <div className="flex gap-4 mt-4 w-full">
              <div className="border border-[#9F9F9F] rounded-[10px] flex gap-6 py-3 px-5">
              <button onClick={decreaseQuantity}>-</button>
              <span className="font-medium">{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="border border-color-black rounded-[15px] text-[17px] w-full max-w-[180px] hover:text-color-white hover:bg-color-black duration-300"
              >
                Add To Cart
              </button>
            </div>
            <div className="bg-[#D9D9D9] w-full h-[1px] my-8"></div>
            <div className="flex gap-6 text-[#9F9F9F]">
              <div className="flex flex-col gap-3">
                <span>Sku</span>
                <span>Category</span>
                <span>Tags</span>
                <span>Share</span>
              </div>
              <div className="flex flex-col gap-3">
                <p>
                  <span className="mr-1">:</span>
                  {productInfo?.sku}
                </p>
                <p>
                  <span className="mr-1">:</span>
                  {productInfo?.category?.categoryName}
                </p>
                <p>
                  <span className="mr-1">:</span>
                  {productInfo?.tags?.map((e, i) => (
                    <span key={e?.id}>
                      {e.tagName}
                      {i < productInfo?.tags?.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <div className="flex gap-4">
                  :<img src={facebook} />
                  <img src={linkedin} />
                  <img src={twitter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
