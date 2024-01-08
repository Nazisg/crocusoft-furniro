import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Description from "../layouts/detail/Description";
import Details from "../layouts/detail/Details";
import PageBar from "../layouts/detail/PageBar";
import RelatedProducts from "../layouts/detail/RelatedProducts";
import {
  fetchProductById,
  setSelectedProduct,
} from "../redux/features/productSlice";

export default function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductById(params.id));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    dispatch(setSelectedProduct(selectedProduct));
  }, [selectedProduct, dispatch]);
  return (
    <>
      <PageBar productInfo={selectedProduct} />
      <Details productInfo={selectedProduct} />
      <Description />
      <RelatedProducts />
    </>
  );
}
