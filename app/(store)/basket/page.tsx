"use client";
import Image from "next/image";
import ProductActions from "@/components/ProductActions";
import { useBasket } from "@/components/BasketContext";
import { useSearch } from "@/components/SearchContext";
import { useEffect } from "react";
import "../../../styles/components/_basket.scss";

export default function BasketPage() {
  const { basket, getTotalPrice, removeFromBasket, addFromBasket } =
    useBasket();

  // searchQuery Contains the value of the search input from header
  const { searchQuery } = useSearch();

  // Save basket in localStorage after any Change or update
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // Filter the basket based on the searchQuery [search input]
  const filteredBasket =
    searchQuery.trim() === ""
      ? basket
      : basket.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="basket">
      <h1>🛒 Basket</h1>
      {filteredBasket.length === 0 ? (
        <p>No items in the basket.</p>
      ) : (
        <div>
          <ul>
            {filteredBasket.map((product) => (
              <li className="product-basket" key={product.id}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                />
                <div>
                  <strong>{product.title}</strong> - ${product.price} x{" "}
                  {product.quantity}
                  <p>Total: ${product.price * product.quantity}</p>
                </div>

                <ProductActions
                  removeFromBasket={removeFromBasket}
                  addFromBasket={addFromBasket}
                  productId={product.id}
                />
              </li>
            ))}
          </ul>
          <div className="total-cost">
            <h3> Total Cost : $ {getTotalPrice().toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
