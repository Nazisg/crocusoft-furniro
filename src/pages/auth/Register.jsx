import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import hidden from "../../assets/icons/hidden.svg";
import show from "../../assets/icons/show.svg";
import { createUser } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const success = useSelector((state) => state.auth.successRegister);
  const [showPassword, setShowPassword] = useState(false);
  const errorMsg = useSelector((state) => state.auth.errorRegister);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Required")
      .max(50, "User name must be at most 50 characters")
      .min(8, "User name must be at least 8 characters"),

    firstName: Yup.string()
      .required("Required")
      .max(50, "First name must be at most 50 characters"),

    lastName: Yup.string()
      .required("Required")
      .max(50, "Last name must be at most 50 characters"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
      .max(256, "Email must be at most 256 characters"),

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: 2,
      isActive: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createUser(values)).then(() => {
          if (success) {
            navigate("/login");
          }
        });
      } catch (error) {
        console.error("There was an error submitting the form:", error);
      }
    },
  });
  return (
    <div className="hero-bg w-full ">
      <div className="backdrop-blur-[5px] w-full ">
        <section className="bg-gray-50 dark:bg-gray-900 h-[100vh] ">
          <div className="flex flex-col items-center justify-center pt-[90px] px-6 pb-8 mx-auto">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="flex gap-3 max-[460px]:flex-col">
                    <div className="w-[50%] max-[460px]:w-full">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        {...formik.getFieldProps("userName")}
                        value={formik.values.userName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="user name"
                        required=""
                      />
                      {formik.touched.userName && formik.errors.userName ? (
                        <div className="text-color-red-accents text-sm">
                          {formik.errors.userName}
                        </div>
                      ) : null}
                    </div>
                    <div className="w-[50%] max-[460px]:w-full">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        {...formik.getFieldProps("firstName")}
                        value={formik.values.firstName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="first name"
                        required=""
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="text-color-red-accents text-sm">
                          {formik.errors.firstName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-3 max-[460px]:flex-col">
                    <div className="w-[50%] max-[460px]:w-full">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        {...formik.getFieldProps("lastName")}
                        value={formik.values.lastName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="last name"
                        required=""
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="text-color-red-accents text-sm">
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </div>
                    <div className="w-[50%] max-[460px]:w-full">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        {...formik.getFieldProps("email")}
                        value={formik.values.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@email.com"
                        required=""
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-color-red-accents text-sm">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
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

                  <div>
                    <p className="text-color-red-accents text-[12px] mb-1">
                      {errorMsg}
                    </p>
                    <button
                      type="submit"
                      className="w-full text-primary-color border border-primary-color hover:bg-primary-color hover:text-color-white duration-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Create account
                    </button>
                  </div>
                  <p className="text-sm !mt-3 font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-color hover:underline"
                    >
                      Login here
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
