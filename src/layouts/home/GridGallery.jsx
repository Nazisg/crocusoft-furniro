import axios from "axios";
import React, { useEffect, useState } from "react";
export default function GridGallery() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://immutable858-001-site1.atempurl.com/api/Home"
        );
        setData(response.data);
      } catch (error) { }
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-4 items-center py-6 overflow-hidden">
      <div className="flex flex-col items-center">
        <span className="text-color-gray-2 text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
          Share your setup with
        </span>
        <h2 className="text-color-gray-1 text-[25px] md:text-[30px] lg:text-[40px] font-bold">
          #FuniroFurniture
        </h2>
      </div>
      <div className="overflow-hidden flex flex-col">
        <div className="gridgallery h-[100vh] gap-2 lg:gap-4 min-w-[768px]">
          {data &&
            data.map((e) => (
              <img
                loading="lazy"
                key={e.id}
                className="h-full w-full object-cover"
                src={e.imageUrls}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
