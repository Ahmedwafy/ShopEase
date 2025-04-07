// Code: Header component
"use client";

import { useState, useEffect } from "react";
import { useSearch } from "./SearchContext";
import { useAuth } from "./AuthContext"; // [1] import useAuth
import Link from "next/link";
import Image from "next/image";
import StoreIcon from "@/public/store-icon.png";
import LoggedIn from "./loggedIn";
import LoggedOut from "./LoggedOut";
import "../styles/components/_header.scss";
import "../styles/layout/_globals.scss";

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const { logged } = useAuth(); // [2] get logged from useAuth()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, setSearchQuery]);

  // -------------------------------------------
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        console.log("Header height:", header.offsetHeight); // Debugging
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`
        );
      }
    };

    setTimeout(updateHeaderHeight, 100); // delay to ensure header is rendered
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);
  // -------------------------------------------

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="logo">
          <Image src={StoreIcon} alt="Store-Icon" width={50} height={50} />
          <h1 className="store-title">ShopEase</h1>
        </Link>

        {/* Search field */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-field"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {logged ? <LoggedIn /> : <LoggedOut />}
      </div>
    </header>
  );
};

export default Header;
