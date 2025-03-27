"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-300 to-purple-400">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80 md:w-[700px]">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-300 transition">
            Login
          </button>
          
          {error && (
            <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center text-sm mt-4">
            <Link href="/register" className="text-teal-500 hover:underline">
              Don't have an account? Register
            </Link>
            
          </div>
        </form>
      </div>
    </div>
  );
}
