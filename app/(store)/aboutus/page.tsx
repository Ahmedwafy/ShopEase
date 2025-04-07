import Link from "next/link";
import "../../../styles/components/_about-us.scss";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-container">
        <h1 className="aboutus">About Us</h1>
        <p className="paragraph-1">
          ShopEase is your go-to online store, aiming to provide a seamless and
          convenient shopping experience with high-quality products and
          excellent customer service. We offer a wide range of products across
          various categories, ensuring that our customers find exactly what they
          need with ease.
        </p>
        <p className="paragraph-2">
          Our mission is to create a hassle-free shopping environment with fast
          delivery, secure payment options, and exceptional support. At
          ShopEase, we value customer satisfaction and continuously strive to
          improve our services.
        </p>

        <Link className="link" href="/">
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
