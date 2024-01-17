import React from "react";
import Feature from "../layouts/Feature";
import PageHeader from "../layouts/PageHeader";
import Form from "../layouts/checkout/Form";
export default function Checkout() {
  return (
    <>
      <PageHeader title="Checkout" page_name="Checkout" />
      <div className="flex justify-center py-10">
        <Form />
      </div>
      <Feature />
    </>
  );
}
