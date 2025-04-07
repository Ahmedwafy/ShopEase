"use client";
import "../styles/components/_product-actions.scss";
import { useState } from "react";
import { MoreVertical, Trash2, Plus, Minus, PackagePlus } from "lucide-react";
import Link from "next/link";

interface ProductActionsProps {
  removeFromBasket: (productId: number, removeAll?: boolean) => void;
  addFromBasket: (productId: number) => void;
  productId: number;
}
export default function ProductActions({
  removeFromBasket,
  addFromBasket,
  productId,
}: ProductActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="product-actions">
      {/* buttons are hidden on small screen */}
      <div className="buttons">
        <Link href="/order" className="order-link">
          <button className="set-order">
            <PackagePlus size={16} /> Order
          </button>
        </Link>
        <button className="remove" onClick={() => removeFromBasket(productId)}>
          <Minus size={16} /> Remove
        </button>
        <button className="add" onClick={() => addFromBasket(productId)}>
          <Plus size={16} /> Add
        </button>
        <button
          className="clear-all"
          onClick={() => removeFromBasket(productId, true)}
        >
          <Trash2 size={16} /> Clear All
        </button>
      </div>

      {/* Dropdown menu appears on small screen */}
      <div className="dropdown">
        <button className="small-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          <MoreVertical size={20} />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <Link href="/order" className="order-link-small">
              <button className="set-order-small">
                {" "}
                <PackagePlus size={16} /> Order
              </button>
            </Link>
            <button
              onClick={() => removeFromBasket(productId)}
              className="remove-small"
            >
              <Minus size={16} /> Remove
            </button>

            <button
              onClick={() => addFromBasket(productId)}
              className="add-small"
            >
              <Plus size={16} /> Add
            </button>

            <button
              onClick={() => removeFromBasket(productId, true)}
              className="clear-all-small"
            >
              <Trash2 size={16} /> Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
