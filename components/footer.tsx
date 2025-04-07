import "../styles/components/_footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h2 className="footer-title">ShopEase</h2>
            <p className="footer-text">
              Your one-stop shop for the latest fashion, electronics, fresh
              food, and more.
            </p>
          </div>

          {/* Customer Support */}
          <div className="footer-section">
            <h3 className="footer-title">Customer Support</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Shipping & Returns</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="footer-section">
            <h3 className="footer-title">Contact us</h3>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
