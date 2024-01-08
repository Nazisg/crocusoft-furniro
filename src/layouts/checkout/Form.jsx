import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  fetchCheckoutData,
  fetchCountryData,
  fetchProvinceData,
} from "../../redux/features/checkoutSlice";
export default function Form() {
  const cartItems = useSelector((state) => state.addToCart.items);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.checkout.formData);
  const country = useSelector((state) => state.checkout.country);
  const province = useSelector((state) => state.checkout.province);
  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    country: Yup.string().required(),
    companyName: Yup.string(),
    streetAddress: Yup.string().required(),
    townCity: Yup.string(),
    province: Yup.string().required(),
    zipCode: Yup.string(),
    phone: Yup.string().required().matches(/^\d+$/, "Invalid phone number"),
    email: Yup.string().email("Invalid email address").required(),
    additionalInformation: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      companyName: "",
      streetAddress: "",
      townCity: "",
      province: "",
      zipCode: "",
      phone: "",
      email: "",
      additionalInformation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      dispatch(fetchCheckoutData(values));
    },
  });

  useEffect(() => {
    dispatch(fetchCountryData());
    dispatch(fetchProvinceData());
  }, [dispatch]);

  const handleCountryChange = (e) => {
    setSelectedCountryId(e.target.value);
    formik.setFieldValue("country", e.target.value);
  };
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const subtotal = cartItems.reduce(
    (acc, e) => acc + (e?.cartItems?.[0]?.salePrice || 0),
    0
  );

  return (
    <form className="w-[75%] flex justify-between items-start min-[320px]:flex-col sm:flex-col md:flex-row lg:flex-row">
      <div className="lg:w-[45%] md:w-[45%] sm:w-[100%] min-[320px]:w-[100%] flex flex-col gap-6 ">
        <h1 className="font-semibold text-[25px] md:text-[28px] lg:text-[33px]">
          Billing details
        </h1>
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex gap-3 lg:gap-6 min-[320px]:flex-col sm:flex-row md:flex-row lg:flex-row">
            <label className="w-full lg:w-[50%] font-medium flex flex-col gap-2">
              First Name
              <input
                className={`${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border border-color-red-accents"
                    : ""
                } w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7`}
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </label>
            <label className="w-full lg:w-[50%] font-medium flex flex-col gap-2">
              Last Name
              <input
                className={`${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border border-color-red-accents"
                    : ""
                } w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7`}
                type="text"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </label>
          </div>
          <label className="w-full font-medium flex flex-col gap-2">
            Country / Region
            <select
              className={`${
                formik.touched.country && formik.errors.country
                  ? "border border-color-red-accents"
                  : ""
              } block w-full min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7  border border-[#9F9F9F] text-[#9F9F9F]  rounded-[10px] leading-tight focus:outline-none`}
              id="country"
              onChange={handleCountryChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            >
              {country?.map((e) => (
                <option key={e?.id} value={e?.id}>
                  {e?.countryName}
                </option>
              ))}
            </select>
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            Company Name (Optional)
            <input
              className="w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7"
              type="text"
            />
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            Street address
            <input
              className={`${
                formik.touched.streetAddress && formik.errors.streetAddress
                  ? "border border-color-red-accents"
                  : ""
              } w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7`}
              type="text"
              id="streetAddress"
              name="streetAddress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streetAddress}
            />
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            Town / City
            <input
              className="w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7"
              type="text"
            />
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            Province
            <select
              className={`${
                formik.touched.province && formik.errors.province
                  ? "border border-color-red-accents"
                  : ""
              } block w-full min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7 border border-[#9F9F9F] text-[#9F9F9F] rounded-[10px] leading-tight focus:outline-none`}
              id="province"
              name="province"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.province}
            >
              {province?.map((e) => {
                if (selectedCountryId == e?.country?.id) {
                  return (
                    <option key={e?.id} value={e?.id}>
                      {e?.provinceName}
                    </option>
                  );
                }
              })}
            </select>
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            ZIP code
            <input
              className="w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7"
              type="text"
            />
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            Phone
            <input
              className={`${
                formik.touched.phone && formik.errors.phone
                  ? "border border-color-red-accents"
                  : ""
              } w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7`}
              type="text"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-color-red-accents">
                {formik.errors.phone}
              </span>
            )}
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            Email address
            <input
              className={`${
                formik.touched.email && formik.errors.email
                  ? "border border-color-red-accents"
                  : ""
              } w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7`}
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-color-red-accents">
                {formik.errors.email}
              </span>
            )}
          </label>
          <label className="w-full font-medium flex flex-col gap-2">
            <input
              className="w-full border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2.5 sm:p-2.5 md:py-4 md:px-7 lg:py-4 lg:px-7"
              type="text"
              placeholder="Additional information"
            />
          </label>
        </div>
      </div>
      <div className="lg:w-[48%] md:w-[45%] sm:w-[100%] min-[320px]:w-[100%] flex flex-col gap-4 py-10 lg:px-5">
        <div className="flex justify-between">
          <h3 className="font-medium min-[320px]:text-[19px] sm:text-[20px] md:text-[23px] lg:text-[25px]">
            Product
          </h3>
          <h3 className="font-medium min-[320px]:text-[19px] sm:text-[20px] md:text-[23px] lg:text-[25px]">
            Subtotal
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {cartItems.map((e, idx) => (
            <div key={idx} className="flex justify-between ">
              <p className="text-[#9F9F9F] flex items-center gap-2">
                {e?.cartItems?.[0].productTitle}
                <span className="text-color-black text-xs">
                  x {e?.cartItems?.[0].count}
                </span>
              </p>
              <p className="font-light">
                {" "}
                Rs. {e?.cartItems?.[0].salePrice.toFixed(2)}
              </p>
            </div>
          ))}
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
        <label
          className={`${
            selectedOption === "option2" ? "text-color-black" : "text-[#9F9F9F]"
          } flex gap-2`}
        >
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
        <label
          className={`${
            selectedOption === "option3" ? "text-color-black" : "text-[#9F9F9F]"
          } flex gap-2`}
        >
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
    </form>
  );
}
