"use client";

import "../styles/components/_products.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearch } from "./SearchContext";
import { useBasket } from "./BasketContext";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

const Products = () => {
  const [Data, setData] = useState<Product[] | null>(null); // use null as initial state to avoid undefined
  const [Error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const { searchQuery } = useSearch();
  const { addToBasket } = useBasket();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const newResponse = await response.json();
        setData(newResponse.products);
      } catch (error) {
        setError("Error Fetching Data");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Data) {
      setFilteredData(
        searchQuery.trim() === ""
          ? Data
          : Data.filter((product) =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
      );
    }
  }, [searchQuery, Data]);

  const handleAddToBasket = (product: Product) => {
    const loggedIn = !!localStorage.getItem("userToken"); // Check if user is logged in by checking for a token in localStorage
    // If not logged in, show an alert and return early
    if (!loggedIn) {
      alert("You must log in first to add products to the basket.");
      return;
    }

    addToBasket({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: `/productsPics/${product.id}.jpg`,
    });
  };

  // check data before render
  if (Error) return <p style={{ color: "red" }}>{Error}</p>;
  if (Data === null) return <p>Loading...</p>;

  return (
    <div className="products">
      <div className="products-2">
        {filteredData.length > 0 ? ( //  check if there are any products to display
          filteredData.map((product) => (
            <div key={product.id} className="products-container">
              <Image
                className="image"
                src={`/productsPics/${product.id}.jpg`}
                alt={product.title}
                width={150}
                height={150}
                onClick={() =>
                  router.push(
                    `/product/${product.id}?${new URLSearchParams({
                      title: product.title,
                      price: product.price.toString(),
                      description: product.description,
                    })}`,
                  )
                }
              />
              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">${product.price} </p>
                <button
                  type="button"
                  className="add-to-basket-btn"
                  onClick={() => handleAddToBasket(product)}
                >
                  Add to Basket
                </button>
                <Link
                  href={`/product/${product.id}?${new URLSearchParams({
                    title: product.title,
                    price: product.price.toString(),
                    description: product.description,
                  })}`}
                >
                  <button className="more-info-btn">More info</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
