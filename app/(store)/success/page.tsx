"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "../../../styles/components/_success.scss";

type OrderDataType = {
  name: string;
  phone: string;
  address: string;
  paymentMethod: "cash" | "card";
  cardNumber?: string;
  orderId: string;
};

export default function SuccessPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderDataType[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("confirmedOrders") || "[]"
    );
    if (storedOrders.length > 0) {
      setOrders(storedOrders);
    } else {
      router.push("/");
    }
  }, [router]);

  if (orders.length === 0) return null;

  return (
    <div className="success-container">
      <h1>🎉 Orders Confirmed!</h1>
      <p>Thank you! Your orders have been successfully placed.</p>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.orderId} className="order-details">
            <h2>📦 Order #{order.orderId}</h2>
            <p>
              <strong>📞 Phone:</strong> {order.phone}
            </p>
            <p>
              <strong>🏠 Address:</strong> {order.address}
            </p>
            <p>
              <strong>💳 Payment Method:</strong>{" "}
              {order.paymentMethod === "cash"
                ? "Cash on Delivery"
                : "Credit Card"}
            </p>
            {order.paymentMethod === "card" && order.cardNumber && (
              <p>
                <strong>💳 Card Number:</strong> **** **** ****{" "}
                {order.cardNumber.slice(-4)}
              </p>
            )}
            <button
              className="cancel-btn"
              onClick={() => {
                // Read - Get the stored orders from localStorage and parse it to JSON
                const ConfirmedOrders: OrderDataType[] = JSON.parse(
                  localStorage.getItem("confirmedOrders") || "[]"
                );

                // get the id of the clicked order
                // const orderToDelete = ConfirmedOrders.find(
                //   (item) => item.orderId === order.orderId
                // );
                // Or
                const clickedOrderId = order.orderId;

                // Filter - Remove the clicked order from the stored orders
                const updatedOrdersList = ConfirmedOrders.filter(
                  (item: OrderDataType) => item.orderId !== clickedOrderId
                );

                // Set - Update the stored orders in localStorage
                localStorage.setItem(
                  "confirmedOrders",
                  JSON.stringify(updatedOrdersList)
                );

                // Update the state to reflect the changes
                setOrders(updatedOrdersList);
              }}
            >
              Cancel Order
            </button>
          </div>
        ))}
      </div>

      <button className="home-btn" onClick={() => router.push("/")}>
        🏡 Back to Home
      </button>
    </div>
  );
}
