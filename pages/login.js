import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [countryCode, setCountryCode] = useState("+880");

  //   const handlePhoneNumberChange = (event) => {
  //     setPhoneNumber(event.target.value);
  //   };

  //   const handleCountryCodeChange = (event) => {
  //     setCountryCode(event.target.value);
  //   };

  //   const validatePhoneNumber = (value) => {
  //     const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
  //     return phoneNumberRegex.test(value) || "Please enter a valid phone number";
  //   };

  return (
    <Layout>
      <form
        action=""
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            className="w-full"
            id="password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        {/* <div className="mb-4">
          <label htmlFor="contact">Contact</label>
          <div>
            <select value={countryCode} onChange={handleCountryCodeChange}>
              <option value="+91">+880 (Bangladesh)</option>
              <option value="+1">+1 (United States)</option>
              <option value="+44">+44 (United Kingdom)</option>
              <option value="+91">+91 (India)</option>
            </select>
            <input
              type="tel"
              className="w-full mt-3"
              {...register("contactNumber", {
                required: "Please enter a phone number",
                minLength: {
                  value: 10,
                  message: "contact number not more than 11 digits",
                },
                validate: validatePhoneNumber,
              })}
              id="contact"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter phone number"
            />
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
        </div> */}
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link legacyBehavior href="register">
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
}
