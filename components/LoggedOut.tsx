// if logged out page
import "../styles/components/_logged-out.scss";
import Link from "next/link";

const LoggedOut = () => {
  return (
    <div className="logged-out">
      <div className="linkss-container">
        <Link className="about-us-btn" href="/aboutus">
          About us
        </Link>
        <Link className="sign-in" href="/signin">
          Sign In
        </Link>
        <Link className="sign-up" href="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoggedOut;
