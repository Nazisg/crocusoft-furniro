import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SendOTPEmail, setEmail } from "../../redux/features/forgotPasswordSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successMsg = useSelector((state) => state.forgotPassword.success);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(SendOTPEmail(values));
      dispatch(setEmail(values.email));
      navigate("/otp-confirm");
      resetForm();
    },
  });

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
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`${
                      formik.touched.email && formik.errors.email
                        ? "border border-color-red-accents"
                        : ""
                    }bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="example@email.com"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-color-red-accents">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full text-primary-color border border-primary-color hover:bg-primary-color hover:text-color-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-color duration-300"
                >
                  Send to Email
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
