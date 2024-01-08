import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductTotal() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const cartItems = useSelector((state) => state.addToCart.items);
console.log(cartItems)
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const subtotal = cartItems.reduce(
    (acc, e) => acc + (e?.cartItems?.[0]?.salePrice || 0),
    0
  );
  return (
    <div className="lg:w-[48%] md:w-[45%] sm:w-[100%] min-[320px]:w-[100%] flex flex-col gap-4 py-10 lg:px-5">
      <div className="flex justify-between">
        <h3 className="font-medium min-[320px]:text-[19px] sm:text-[20px] md:text-[23px] lg:text-[25px]">
          Product
        </h3>
        <h3 className="font-medium min-[320px]:text-[19px] sm:text-[20px] md:text-[23px] lg:text-[25px]">
          Subtotal
        </h3>
      </div>
      <div className="flex justify-between">
        {
          cartItems.map(e=>(
            <p className="text-[#9F9F9F] flex items-center gap-2">
            {e?.cartItems?.[0].productTitle}
            <span className="text-color-black text-xs">x {e?.cartItems?.[0].count}</span>
          </p>
          ))
        }
       
        <p className="font-light">Rs. {subtotal?.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p className="font-light"> Rs. {subtotal?.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p>Total</p>
        <p className="font-bold text-primary-color text-[21px] lg:text-[22px]">
        Rs. {subtotal?.toFixed(2)}
        </p>
      </div>
      <div className="bg-[#D9D9D9] w-full h-[1px] mt-2"></div>
      <label
        className={`${
          selectedOption === "option1" ? "text-color-black" : "text-[#9F9F9F]"
        } flex gap-2`}
      >
        <input
          className="accent-color-black"
          type="radio"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleRadioChange}
        />
        Direct Bank Transfer
      </label>
      {selectedOption === "option1" && (
        <p className="text-[#9F9F9F] font-light leading-[1.4rem]">
          Make your payment directly into our bank account. Please use your
          Order ID as the payment reference. Your order will not be shipped
          until the funds have cleared in our account.
        </p>
      )}
      <label className={`${
          selectedOption === "option2" ? "text-color-black" : "text-[#9F9F9F]"
        } flex gap-2`}>
        <input
          type="radio"
          className="accent-color-black"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleRadioChange}
        />
        Direct Bank Transfer
      </label>
      {selectedOption === "option2" && (
        <p className="text-[#9F9F9F] font-light leading-[1.4rem]">
          Make your payment directly into our bank account. Please use your
          Order ID as the payment reference.
        </p>
      )}
      <label  className={`${
          selectedOption === "option3" ? "text-color-black" : "text-[#9F9F9F]"
        } flex gap-2`}>
        <input
          type="radio"
          className="accent-color-black"
          value="option3"
          checked={selectedOption === "option3"}
          onChange={handleRadioChange}
        />
        Cash On Delivery
      </label>
      {selectedOption === "option3" && (
        <p className="text-[#9F9F9F] font-light leading-[1.4rem]">
          Make your payment directly into our bank account.
        </p>
      )}
      <p className="font-light leading-[1.4rem]">
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account, and for other purposes
        described in our
        <span className="font-semibold"> privacy policy</span>.
      </p>
      <div className="flex justify-center mt-4 lg:mt-7">
        <button className="w-[60%] text-lg border border-color-black rounded-[15px] py-2 font-medium hover:bg-color-black hover:text-color-white duration-300">
          Place order
        </button>
      </div>
    </div>
  );
}
