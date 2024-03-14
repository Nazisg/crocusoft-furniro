import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";

export default function RelatedProducts() {
  const [related, setRelated] = useState(null);
  const params = useParams();

  const getProduct = async (categoryId) => {
    const res = await axios.get(
      `https://immutable858-001-site1.atempurl.com/api/UserProduct/GetRelatedCategoryProducts?CategoryId=1&Page=1&ShowMore.Take=4`
    );
    setRelated(res.data);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <div className="bg-[#D9D9D9] w-full h-[1px]"></div>
      <div className="flex justify-center">
        <div className="w-[85%] py-14 flex flex-col gap-8 items-center ">
          <h2 className="font-medium text-[25px] lg:text-[32px] text-center">
            Related Products
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {related?.map((e) => (
              <Card
                key={e.id}
                id={e.id}
                title={e.title}
                img={e.imageFiles}
                subTitle={e.subTitle}
                discountedPrice={e.discountedPrice}
                salePrice={e.salePrice}
                discountPercent={e.discountPercent}
                isNew={e.isNew}
              />
            ))}
          </div>
          {related?.length > 3 && (
            <button className="border border-primary-color bg-color-white text-[14px] lg:text-[16px] text-primary-color font-semibold py-1 px-9 lg:px-14 hover:bg-primary-color hover:text-color-white transition-all duration-300">
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
