"use client";

import "../styles/components/_product-component.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useBasket } from "./BasketContext";

const ProductComponent = ({
  product,
}: {
  product: { id: number; title: string; description: string; price: number };
}) => {
  const { addToBasket, basket } = useBasket();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (basket && basket.length > 0) {
      const existingItem = basket.find((item) => item.id === product.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    }
  }, [basket, product.id]);

  const handleAddToBasket = () => {
    addToBasket({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: `/productsPics/${product.id}.jpg`,
    });
  };

  return (
    <div className="product">
      <div className="product-container">
        <div className="title-and-image">
          <h2>{product?.title}</h2>
          <Image
            className="image"
            src={`/productsPics/${product.id}.jpg`}
            alt={product.title}
            width={150}
            height={150}
          />
        </div>
        <div className="info">
          <p>{product?.description}</p>
          <p>Price: $ {product?.price}</p>
          <button
            type="button"
            className="add-to-basket-btn"
            onClick={handleAddToBasket}
          >
            Add to Basket
          </button>
          <p>
            <strong>{product.title}</strong> x {quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
