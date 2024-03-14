import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { submitFormData } from "../../redux/features/contactSlice";

export default function ContactMessage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.contact);
  const userId = localStorage.getItem("userId");
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    subject: Yup.string(),
    message: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      userId: parseInt(userId),
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(submitFormData(values));
        console.log("Form data submitted successfully");
        formik.resetForm();
        return (
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        );
      } catch (error) {
        console.error("Error submitting form data:", error.message);
      }
    },
  });

  return (
    <form
      className="md:w-[75%] lg:w-[75%] flex flex-col gap-3 lg:gap-5 items-start"
      onSubmit={formik.handleSubmit}
    >
      <label className="flex flex-col gap-3 w-full font-medium">
        Your name
        <input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${formik.touched.name && formik.errors.name ? "border-red-500" : ""
            } placeholder:text-[#9F9F9F] placeholder:font-normal border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2 sm:p-3 md:p-4 lg:p-4 w-full`}
          placeholder="Abc"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-color-red-accents text-sm">
            {formik.errors.name}
          </div>
        ) : null}
      </label>
      <label className="flex flex-col gap-3 w-full font-medium">
        Email address
        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${formik.touched.email && formik.errors.email ? "border-red-500" : ""
            } placeholder:text-[#9F9F9F] placeholder:font-normal border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2 sm:p-3 md:p-4 lg:p-4 w-full`}
          placeholder="Abc@def.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-color-red-accents text-sm">
            {formik.errors.email}
          </div>
        ) : null}
      </label>
      <label className="flex flex-col gap-3 w-full font-medium">
        Subject
        <input
          name="subject"
          type="text"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="placeholder:text-[#9F9F9F] placeholder:font-normal border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2 sm:p-3 md:p-4 lg:p-4 w-full"
          placeholder="This is optional"
        />
      </label>
      <label className="flex flex-col gap-3 w-full font-medium">
        Message
        <textarea
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${formik.touched.message && formik.errors.message
              ? "border-red-500"
              : ""
            } placeholder:text-[#9F9F9F] placeholder:font-normal border border-[#9F9F9F] rounded-[10px] min-[320px]:p-2 sm:p-3 md:p-4 lg:p-4 outline-none resize-none w-full h-40`}
          placeholder="Hi! I’d like to ask about"
        ></textarea>
        {formik.touched.message && formik.errors.message ? (
          <div className="text-color-red-accents text-sm">
            {formik.errors.message}
          </div>
        ) : null}
      </label>
      <button
        type="submit"
        className="bg-primary-color text-color-white rounded-[5px] py-2 min-[320px]:px-6 sm:px-8 md:px-10 lg:px-12 border border-primary-color hover:border hover:border-primary-color hover:bg-color-white hover:text-primary-color duration-300"
        style={{ color: "white", backgroundColor: "#B88E2F" }}
      >
        Submit
      </button>
    </form>
  );
}
