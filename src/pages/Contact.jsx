import React from "react";
import Feature from "../layouts/Feature";
import PageHeader from "../layouts/PageHeader";
import ContactDetail from "../layouts/contact/ContactDetail";
import ContactMessage from "../layouts/contact/ContactMessage";
export default function Contact() {
  return (
    <div>
      <PageHeader page_name="Contact" title="Contact" />
      <section className="flex justify-center py-10">
        <div className="w-[70%] flex flex-col gap-5">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-semibold min-[320px]:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px]">
              Get In Touch With Us
            </h2>
            <p className="text-[#9F9F9F] lg:w-[55%] text-[15px] lg:text-[16px] text-center">
              For More Information About Our Product & Services. Please Feel
              Free To Drop Us An Email. Our Staff Always Be There To Help You
              Out. Do Not Hesitate!
            </p>
          </div>
          <div className="flex gap-7 pt-8 min-[320px]:flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row">
            <ContactDetail />
            <ContactMessage />
          </div>
        </div>
      </section>
      <Feature />
    </div>
  );
}
