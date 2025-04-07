"use client";
import ProductComponent from "@/components/Product-Page";
import { useSearchParams, useParams } from "next/navigation";
import "../../../../styles/components/_product-page.scss";

const ProductPage = () => {
  // useSearchParams to get query parameters from URL [all data in params]
  const searchParams = useSearchParams();

  // use useParams() to get product's id from URL
  const { id } = useParams();

  // get product's info from query parameters
  const product = {
    id: Number(id), // convert id into a number
    title: searchParams.get("title") || "No Title",
    price: Number(searchParams.get("price")) || 0,
    description: searchParams.get("description") || "No Description",
    thumbnail: searchParams.get("thumbnail") || "",
  };

  return (
    <div>
      <ProductComponent product={product} />
    </div>
  );
};

export default ProductPage;
