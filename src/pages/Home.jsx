import React from "react";
import Hero from "../layouts/home/Hero";
import Range from "../layouts/home/Range";
import OurProducts from "../layouts/home/OurProducts";
import Carousel from "../layouts/home/Carousel";
import GridGallery from "../layouts/home/GridGallery";
export default function Home() {
  return (
    <div>
      <Hero />
      <Range />
      <OurProducts />
      <Carousel />
      <GridGallery />
    </div>
  );
}
