import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import img from "../../assets/images/slider-img.png";
import img2 from "../../assets/images/slider-img-2.png";
import img3 from "../../assets/images/dining.png";
import img4 from '../../assets/images/living.png'
import arrow from "../../assets/icons/slider-next.svg";
import right from "../../assets/icons/right.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Carousel() {
  const slides = [
    {
      id: 1,
      category: "Inner Peace",
      title: "Bed Room",
      image: img,
    },
    {
      id: 2,
      category: "Inner Peace",
      title: "Bed Room",
      image: img2,
    },
    {
      id: 3,
      category: "Inner Peace",
      title: "Bed Room",
      image: img3,
    },
    {
      id: 4,
      category: "Inner Peace",
      title: "Bed Room",
      image: img4,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (current) => {
      setActiveSlide(slides[current].id);
      setisDot(current > 0);
    },
    beforeChange: (newIndex) => setActiveSlide(slides[newIndex].id),

    customPaging: function (i) {
      return (
        <div
          className={`slick-dot ${
            activeSlide == slides[i].id ? "slick-active" : ""
          }`}
        >
          <div className="dot-inner"></div>
        </div>
      );
    },

    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(slides[0].id);
  const [isDot, setisDot] = useState(false);

  return (
    <section className="bg-[#FCF8F3] py-4 w-full flex min-[320px]:justify-center sm:justify-center md:justify-center lg:justify-end xl:justify-end">
      <div className="w-[92%] flex gap-4 items-center min-[320px]:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
        <div className=" flex flex-col items-start gap-3 p-4 lg:p-2 xl:p-2 ">
          <h2 className="text-color-gray-1 font-bold text-[25px] md:text-[30px] lg:text-[36px] w-full">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="text-color-gray-2 font-medium text-[14px] lg:text-[16px]">
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <button className="shadow-md bg-primary-color border border-primary-color text-color-white py-2 px-4 lg:px-6 hover:bg-[#FCF8F3] hover:text-primary-color hover:border hover:border-primary-color duration-300">
            Explore More
          </button>
        </div>
        <div className="min-[320px]:w-full sm:w-full md:w-[80%] lg:w-full xl:w-full relative overflow-hidden">
          <Slider
            ref={sliderRef}
            className="mr-3
             h-[510px] relative w-[130%]"
            {...settings}
          >
            {slides.map((slide) => {
              const isActive = slide.id === activeSlide;
              return (
                <div
                  key={slide.id}
                  className="item relative overflow-hidden "
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`${
                      slide.id === activeSlide ? "h-[480px] w-[400px]" : "h-[430px] w-[370px]"
                    } transition-all duration-300 px-4`}
                  />
                  {isActive && (
                    <div className="absolute bottom-10 left-10 w-[210px] bg-color-white bg-opacity-75 px-6 py-9">
                      <p className="text-color-gray-2 text-[14px] uppercase tracking-widest">
                        0{slide.id} — {slide.category}
                      </p>
                      <h3 className="text-[20px] lg:text-[24px] font-semibold text-gray-800">
                        {slide.title}
                      </h3>
                      <div className="absolute right-[-20%]  bottom-0 bg-primary-color text-color-white p-2 font-bold">
                        <img src={right} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </Slider>
          <button
            className="absolute top-[50%] right-[3%]  bg-color-white rounded-full h-10 w-10 flex justify-center items-center shadow-lg hover:bg-neutral-100 duration-300`"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <img src={arrow} alt="Next" />
          </button>
          {isDot && (
            <button
              className="absolute top-[50%] left-[3%]  bg-color-white rounded-full h-10 w-10 flex justify-center items-center shadow-lg hover:bg-neutral-100 duration-300`"
              onClick={() => sliderRef.current?.slickPrev()}
              
            >
              <img
                src={arrow}
                alt="Prev"
                style={{ transform: "rotate(180deg)" }}
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
