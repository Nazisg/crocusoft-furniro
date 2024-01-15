import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import hidden from "../../assets/icons/hidden.svg";
import show from "../../assets/icons/show.svg";
import { Loginn } from "../../redux/features/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const success = useSelector((state) => state.auth.success);
  const errorMsg = useSelector((state) => state.auth.error);
  
  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Required")
      .max(50, "User name must be at most 50 characters")
      .min(8, "User name must be at least 8 characters"),

    password: Yup.string()
      .matches(/[a-z]/, "Password must include at least one lowercase letter")
      .matches(/\d/, "Password must include at least one number")
      .matches(/[A-Z]/, "Password must include at least one uppercase letter")
      .matches(/[@$!%*?&]/, "Password must include at least one symbol")
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(Loginn(values))
        .then(() => {
          if (success) {
            navigate("/");
          }
        })
      } catch (error) {
        console.error("There was an error submitting the form:", error);
      }
    },
  });
  return (
    <div className="hero-bg w-full">
      <div className="backdrop-blur-[5px] w-full">
        <section className="bg-gray-50 dark:bg-gray-900 h-[100vh]">
          <div className="flex flex-col items-center justify-center pt-[90px] px-6 pb-8 mx-auto">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      User name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      {...formik.getFieldProps("userName")}
                      className={`${
                        formik.touched.userName && formik.errors.userName
                          ? "border border-color-red-accents"
                          : ""
                      } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="username"
                      value={formik.values.userName}
                      required=""
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                      <div className="text-red-500 text-sm text-color-red-accents">
                        {formik.errors.userName}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...formik.getFieldProps("password")}
                        placeholder="••••••••"
                        className={`${
                          formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : ""
                        } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        required=""
                        value={formik.values.password}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <img className="w-[25px]" src={hidden} />
                        ) : (
                          <img className="w-[25px]" src={show} />
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-color-red-accents text-sm">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start"></div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary-color hover:underline "
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <p className="text-color-red-accents text-[13px] mb-1 !mt-1">
                      {errorMsg}
                    </p>
                  <button
                    type="submit"
                    className="!mt-2 w-full text-primary-color border border-primary-color hover:bg-primary-color hover:text-color-white duration-300 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary-color hover:underline "
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
