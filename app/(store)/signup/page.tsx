// Sign Up Page
"use client";
import Link from "next/link";
import "../../../styles/components/_signUp.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignUpFormType = {
  email: string;
  password: string;
  confirmPass: string;
  phone: string;
};

const SignUpPage = () => {
  const router = useRouter();
  const [signUpDetails, setSignUpDetails] = useState<SignUpFormType>({
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<SignUpFormType>>({});

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Partial<SignUpFormType> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!emailRegex.test(signUpDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    if (signUpDetails.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (signUpDetails.confirmPass !== signUpDetails.password) {
      newErrors.confirmPass = "Passwords do not match";
    }

    if (!phoneRegex.test(signUpDetails.phone)) {
      newErrors.phone = "Phone number must be only digits (10-15 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation failed!", errors);
      return;
    }

    localStorage.setItem("signUpDetails", JSON.stringify(signUpDetails));
    console.log("User registered:", signUpDetails);
    router.push("/");
  };

  return (
    <div className="SignUp">
      <div className="SignUp-container">
        <h1 className="signUP-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmitSignUp}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              className="form-input"
              type="text"
              id="email"
              name="email"
              onChange={handleValueChange}
              value={signUpDetails.email}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
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
              onChange={handleValueChange}
              value={signUpDetails.password}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmation" className="form-label">
              Confirm Password
            </label>
            <input
              className="form-input"
              type="password"
              id="confirmation"
              name="confirmPass"
              onChange={handleValueChange}
              value={signUpDetails.confirmPass}
            />
            {errors.confirmPass && (
              <p className="error-message">{errors.confirmPass}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              className="form-input"
              type="text"
              id="phone"
              name="phone"
              onChange={handleValueChange}
              value={signUpDetails.phone}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <button type="submit" className="form-submit">
            Sign Up
          </button>

          <div className="form-group2">
            <h3>Already have an account?</h3>
            <Link className="signin" href="/signin">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
