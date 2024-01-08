import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Description() {
  const [description, setDescription] = useState(null);
  const params = useParams();

  const getProduct = async (id) => {
    const res = await axios.get(
      `http://immutable858-001-site1.atempurl.com/api/UserProduct/getById/Description?Id=${id}`
    );
    setDescription(res.data);
  };
  useEffect(() => {
    if (params.id) {
      getProduct(params.id);
    }
  }, [params.id]);

  return (
    <div>
      <div className="bg-[#D9D9D9] w-full h-[1px]"></div>
      <div className="w-full flex justify-center">
        <div className="w-[85%] flex flex-col gap-4 lg:gap-8 justify-center items-center py-14">
          <div className="flex gap-4 lg:gap-8">
            <p className="text-[18px] lg:gtext-[24px] font-medium text-center">
              Description
            </p>
            <p className="text-[#9F9F9F] text-[18px] lg:gtext-[24px] text-center">
              Additional Information
            </p>
            <p className="text-[#9F9F9F] text-[18px] lg:gtext-[24px] text-center">
              Reviews [5]
            </p>
          </div>
          <p className="lg:w-[80%]  text-[#9F9F9F] text-justify">
            {description?.introduction}
          </p>
          <div className="flex w-full gap-5 lg:gap-6 min-[320px]:flex-col sm:flex-col md:flex-row lg:flex-row">
            {description?.imageFiles?.map((e,i) => (
              <div key={i} className="bg-[#F9F1E7] rounded-[10px] w-full h-52 flex justify-center items-center">
                <img src={e} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
