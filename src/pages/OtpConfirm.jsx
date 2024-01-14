import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { OtpConfirmation } from "../redux/features/forgotPasswordSlice";
import { useNavigate } from "react-router-dom";

export default function OtpConfirm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.forgotPassword.email); 
    const formikOTP = useFormik({
    initialValues: {
      otpToken: "",
    },
    validationSchema: Yup.object({
      otpToken: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        OtpConfirmation({
          email: email,
          otpToken: values.otpToken,
        })
      );
    },
  });
  console.log(email)
  return (
    <div className="hero-bg w-full">
      <div className="backdrop-blur-[5px] w-full">
        <section className="bg-gray-50 dark:bg-gray-900 h-[100vh]">
          <div className="flex flex-col items-center justify-center pt-[90px] px-6 pb-8 mx-auto">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form
                className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                onSubmit={formikOTP.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="otpToken"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    OTP code
                  </label>
                  <input
                    type="text"
                    name="otpToken"
                    id="otpToken"
                    className={`${
                      formikOTP.touched.otpToken && formikOTP.errors.otpToken
                        ? "border border-color-red-accents"
                        : ""
                    }bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="XXXXXX"
                    onChange={formikOTP.handleChange}
                    onBlur={formikOTP.handleBlur}
                    value={formikOTP.values.otpToken}
                  />
                  {formikOTP.touched.otpToken && formikOTP.errors.otpToken ? (
                    <div className="text-color-red-accents">
                      {formikOTP.errors.otpToken}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full text-primary-color border border-primary-color hover:bg-primary-color hover:text-color-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-color duration-300"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
