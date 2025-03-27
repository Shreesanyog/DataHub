"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ name: "", email: "", password: "" });

  const router = useRouter();

  const validateFields = () => {
    let isValid = true;
    const newError = { name: "", email: "", password: "" };

    // Name validation
    if (!name) {
      newError.name = "Name is required.";
      isValid = false;
    }

    // Email validation
    if (!email) {
      newError.email = "Email is required.";
      isValid = false;
    } else if (!email.includes("@") || !email.includes(".com")) {
      newError.email = "Please enter a valid Gmail address.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newError.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newError.password = "Password must be at least 6 characters long.";
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      newError.password = "Password must contain at least one lowercase letter.";
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newError.password = "Password must contain at least one uppercase letter.";
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newError.password = "Password must contain at least one number.";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newError.password = "Password must contain at least one special character.";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!validateFields()) return;

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError({ ...error, email: "User already exists." });
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/"); // Redirect after successful registration
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-300 to-purple-400">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80 md:w-[700px]"> {/* Wider card */}
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {error.name && <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">{error.name}</div>}

          {/* Email Input */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {error.email && <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">{error.email}</div>}

          {/* Password Input */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {error.password && <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">{error.password}</div>}

          <button className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-300 transition">
            Register
          </button>

          <div className="flex justify-between items-center text-sm mt-4">
            <Link href="/" className="text-teal-500 hover:underline">
              Already have an account? Login
            </Link>
           
          </div>
        </form>
      </div>
    </div>
  );
}
