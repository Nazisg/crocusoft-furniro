import React from "react";
import Carousel from "../layouts/home/Carousel";
import GridGallery from "../layouts/home/GridGallery";
import Hero from "../layouts/home/Hero";
import OurProducts from "../layouts/home/OurProducts";
import Range from "../layouts/home/Range";
export default function Home() {
  return (
    <>
      <Hero />
      <Range />
      <OurProducts />
      <Carousel />
      <GridGallery />
    </>
  );
}
