import React from "react";
import Feature from "../layouts/Feature";
import PageHeader from "../layouts/PageHeader";
import CartProducts from "../layouts/cart/CartProducts";
import Totals from "../layouts/cart/Totals";

export default function () {
  return (
    <>
      <PageHeader title="Cart" page_name="Cart" />
      <div className="flex justify-center">
        <div className="w-[85%] flex min-[320px]:flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row gap-6 py-10 items-start">
          <CartProducts />
          <Totals />
        </div>
      </div>
      <Feature />
    </>
  );
}
