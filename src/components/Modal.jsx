import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartItemdel from "../assets/icons/cartItemdel.svg";
import cartdel from "../assets/icons/cartdel.svg";
import { deleteItem, getAllCartItems } from "../redux/features/addToCartSlice";
import { closeModal } from "../redux/features/modalSlice";
export default function Modal() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.addToCart.items);
  const userId = localStorage.getItem("userId");
  const userID_Int = useMemo(() => {
    if (userId) {
      return parseInt(userId);
    }
  }, [userId]);

  const handleClose = () => {
    dispatch(closeModal());
    document.body.style.overflow = "auto";
  };
  useEffect(() => {
    if (userID_Int) {
      dispatch(getAllCartItems(userID_Int));
    }
  }, [userID_Int, dispatch]);

  const handleRemoveFromCart = (productId, colorId) => {
    if (userID_Int) {
      dispatch(
        deleteItem({
          userId: userID_Int,
          productId: productId,
          colorId: colorId,
        })
      ).then(() => {
        dispatch(getAllCartItems(userID_Int));
      });
    }
  };

  const subtotal = cartItems.reduce(
    (acc, e) => acc + (e?.cartItems?.[0]?.subtotal || 0),
    0
  );

  return (
    <div
      onClick={handleClose}
      className="flex justify-end w-full h-full bg-[#00000083] left-0 top-0 z-50 fixed modal"
    >
      <div
        className="w-[400px] h-[100vh]  fixed shadow-md modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col bg-color-white h-[100vh] justify-between">
          <div className="flex flex-col justify-between gap-4">
            <div className="flex justify-between pt-8 px-8">
              {/* <!--Modal title--> */}
              <h5 className="text-2xl font-semibold leading-normal">
                Shopping Cart
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="cursor-pointer box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={handleClose}
              >
                <img src={cartdel} className="cursor-pointer" />
              </button>
            </div>
            <div className="bg-[#D9D9D9] h-[1px] w-[70%] ml-8"></div>
            {/* <!--Modal body--> */}
            <div className="flex flex-col justify-between  h-[70vh] mr-[2px]">
              <div className="flex flex-col gap-3 overflow-y-scroll">
                {cartItems.length == 0 && (
                  <div className="flex justify-center text-lg text-color-gray-3">
                    Your cart is empty{" "}
                  </div>
                )}
                {cartItems.map((e, idx) => (
                  <div
                    key={idx}
                    className="flex px-8 items-center justify-between"
                  >
                    <div className="flex gap-6 items-center">
                      <div className="w-[90px] h-[90px] bg-[#EFE6D1] flex justify-center items-center rounded-[10px]">
                        <img
                          className="w-full h-full object-cover"
                          src={e?.cartItems?.[0].productImages?.imageFiles[0]}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3>{e?.cartItems?.[0].productTitle}</h3>
                        <div className="flex items-center gap-4">
                          <span className="font-light">
                            {e?.cartItems?.[0].count}
                          </span>
                          <span className="font-light text-xs">x</span>
                          <span className="text-primary-color text-xs font-medium">
                            Rs. {e?.cartItems?.[0].salePrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <img
                      src={cartItemdel}
                      className="cursor-pointer"
                      onClick={() =>
                        handleRemoveFromCart(
                          e.cartItems[0].productId,
                          e.cartItems[0].productImages.id
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between  px-8 pt-2">
                <span>Subtotal</span>
                <span className="font-semibold text-primary-color pr-10">
                  Rs. {subtotal?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-[#D9D9D9] w-full h-[1px] p-[0.5px] mt-3"></div>
            <div className="flex gap-5 px-8 pb-8 pt-5">
              <Link to="/cart" onClick={handleClose}>
                <button className="border border-color-black text-[13px] rounded-[50px] py-1 px-7 bg-color-white hover:bg-color-black hover:text-color-white duration-300">
                  Cart
                </button>
              </Link>
              <Link to="/checkout" onClick={handleClose}>
                <button className="border border-color-black text-[13px] rounded-[50px] py-1 px-7 bg-color-white hover:bg-color-black hover:text-color-white duration-300">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
