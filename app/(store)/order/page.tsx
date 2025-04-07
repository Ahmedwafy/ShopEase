"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "../../../styles/components/_order.scss";

type FormDataType = {
  name: string;
  phone: string;
  address: string;
  paymentMethod: "cash" | "card";
  cardNumber?: string;
  cvv?: string;
  orderId: string;
};

type ErrorsType = Partial<Record<keyof FormDataType, string>>;

export default function OrderPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<FormDataType, "orderId">>({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
    cardNumber: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<ErrorsType>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorsType = {};

    if (formData.name.trim().length < 3) newErrors.name = "Name is required";
    if (!/^01[0-9]{9}$/.test(formData.phone))
      newErrors.phone = "Invalid number";
    if (formData.address.trim().length < 10)
      newErrors.address = "Address is required";

    if (formData.paymentMethod === "card") {
      if (!/^\d{16}$/.test(formData.cardNumber || "")) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      if (!/^\d{3,4}$/.test(formData.cvv || "")) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Create new object [ copied from formData ] with unique order ID
      const newOrder: FormDataType = {
        ...formData,
        orderId: Date.now().toString(), // Unique order ID
      };

      // Read / Get confirmed Orders
      // or empty array to avoid null > [1st time load page]
      const storedOrders = JSON.parse(
        localStorage.getItem("confirmedOrders") || "[]"
      );
      const updatedOrders = [...storedOrders, newOrder];
      localStorage.setItem("confirmedOrders", JSON.stringify(updatedOrders));

      router.push("/success");
    }
  };

  return (
    <div className="order-container">
      <h1>Complete Your Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={() =>
                  setFormData({
                    ...formData,
                    paymentMethod: "cash",
                    cardNumber: "",
                  })
                }
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={() =>
                  setFormData({ ...formData, paymentMethod: "card" })
                }
              />
              Pay with Card
            </label>
          </div>
        </div>

        {formData.paymentMethod === "card" && (
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              value={formData.cvv}
              onChange={handleInputChange}
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </div>
        )}

        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}
