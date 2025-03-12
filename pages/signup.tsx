"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

// Define TypeScript Interface for Form Data
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // Handle Form Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! ❌");
      return;
    }
    alert("Signup successful! ✅");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen flex flex-col">
      <Head>
        <title>Signup - E-Learning Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-white">
            E-Learning
          </Link>
          <ul className="flex space-x-6">
            {["Home", "Courses", "About", "Contact", "Login", "Sign Up"].map(
              (name, index) => (
                <li key={index}>
                  <Link
                    href={`/${name.toLowerCase().replace(" ", "")}`}
                    className="text-white text-lg hover:text-yellow-300 transition-all duration-300"
                  >
                    {name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>

      <section className="container mx-auto px-6 py-16 text-center">
        <motion.h1
          className="text-5xl font-extrabold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Join <span className="text-purple-600">E-Learning</span> Today!
        </motion.h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Create an account to access premium courses and a vibrant learning community.
        </p>
      </section>

      <section className="container mx-auto px-6 py-8 max-w-md bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          {["fullName", "email", "password", "confirmPassword"].map(
            (field, index) => (
              <motion.div
                className="mb-4"
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
              >
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={formData[field as keyof FormData] ?? ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter your ${field.replace("confirmPassword", "confirm password")}`}
                />
              </motion.div>
            )
          )}

          <motion.div
            className="mb-4 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">
              I agree to the <Link href="#" className="text-purple-600 hover:underline">Terms & Conditions</Link>
            </span>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>

          <p className="text-center text-gray-700 mt-4">
            Already have an account? <Link href="/login" className="text-purple-600 hover:underline">Login</Link>
          </p>
          
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="space-y-4">
            {["google", "github"].map((provider) => (
              <button
                key={provider}
                className={`w-full flex items-center justify-center ${
                  provider === "google" ? "bg-white border border-gray-300" : "bg-gray-900 text-white"
                } rounded-lg py-2 shadow-md hover:${provider === "google" ? "bg-gray-100" : "bg-gray-800"} transition-all`}
              >
                <Image
                  src={`/images/${provider}.jpg`}
                  alt={provider}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Sign Up with {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </button>
            ))}
          </div>
        </form>
      </section>
    </div>
  );
}
