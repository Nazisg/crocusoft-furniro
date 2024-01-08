import React from "react";
import PageHeader from "../layouts/PageHeader";
import Feature from "../layouts/Feature";
import BlogContainer from "../layouts/blog/BlogContainer";

export default function Blog() {
  return (
    <>
      <PageHeader page_name="Blog" title="Blog" />
      <BlogContainer />
      <Feature />
    </>
  );
}
