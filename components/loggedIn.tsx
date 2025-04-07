"use client";

// Logged In Page
import "../styles/components/_loggedin.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../components/AuthContext"; // [1] import useAuth
import { useBasket } from "@/components/BasketContext";

const LoggedIn = () => {
  const router = useRouter();
  const { setLogged } = useAuth(); // [2] use setLogged from AuthContext
  const { getUniqueItemsCount } = useBasket();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // [3] remove the saved login state
    setLogged(false); // [4] update state in AuthContext

    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  return (
    <div className="logged-in">
      <div className="links-container">
        <Link href="/basket" className="basket-btn">
          Basket{" "}
          {getUniqueItemsCount() > 0 && (
            <span className="basket-count">{getUniqueItemsCount()}</span>
          )}
        </Link>
        <Link href="/success" className="orders-btn">
          Orders
        </Link>
        <Link href="/aboutus" className="aboutus-btn">
          About Us
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoggedIn;
