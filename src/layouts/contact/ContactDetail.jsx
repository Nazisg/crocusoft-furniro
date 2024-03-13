import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clock from "../../assets/icons/clock.svg";
import location from "../../assets/icons/location.svg";
import phone from "../../assets/icons/phone.svg";
import { fetchContactData } from "../../redux/features/contactSlice";

export default function ContactDetail() {
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.contact.data);
  const { status } = useSelector((state) => state.contact);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContactData());
    }
  }, [dispatch, status]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 lg:gap-7 items-start">
        <img
          className="min-[320px]:w-[15px] sm:w-[16px] md:w-[17px] lg:w-[18px]"
          src={location}
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-[22px] lg:text-[24px]">Address</h3>
          <p className="md:w-[53%] lg:w-[53%]">{contactData?.address}</p>
        </div>
      </div>
      <div className="flex gap-4 lg:gap-7 items-start">
        <img
          className="min-[320px]:w-[23px] sm:w-[23px] md:w-[24px] lg:w-[25px]"
          src={phone}
        />
        <div className="flex flex-col">
          <h3 className="font-medium text-[22px] lg:text-[24px]">Phone</h3>
          <p>Mobile:{contactData?.mobile}</p>
          <p>Hotline:{contactData?.hotline}</p>
        </div>
      </div>
      <div className="flex gap-4 lg:gap-7 items-start">
        <img
          className="min-[320px]:w-[17px] sm:w-[18px] md:w-[19px] lg:w-[20px]"
          src={clock}
        />
        <div className="flex flex-col">
          <h3 className="font-medium text-[22px] lg:text-[24px]">
            Working Time
          </h3>
          <p>{contactData?.weekdayWorkingTime}</p>
          <p>{contactData?.weekendWorkingTime}</p>
        </div>
      </div>
    </div>
  );
}
