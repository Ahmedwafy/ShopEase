// Sign In Page
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../components/AuthContext";
import "../../../styles/components/_signIn.scss";

const SignIn = () => {
  const router = useRouter();
  const { handleLogin } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // [2] Read - Get data from Local Storage
    const savedUser = localStorage.getItem("signUpDetails");
    if (!savedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    const userData = JSON.parse(savedUser);

    // [3] Validate - Check if the email and password match
    if (
      credentials.email === userData.email &&
      credentials.password === userData.password
    ) {
      const fakeToken = "123456789abcdef"; // use fake token for demo purposes
      handleLogin(fakeToken); // update state and save token in local storage
      router.push("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="SignIn">
      <div className="SignIn-container">
        <h1 className="signIn-title">Sign In</h1>
        <form className="signin-form" onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              className="form-input"
              type="text"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="sign-in">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
