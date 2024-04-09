import axios from "axios";
import React, { useState } from "react";

export default function SignupForm({ setshowLogin }) {
    const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false)
  const [passwordWarning, setPasswordWarning] = useState("");
  const handleChange = (event) => {
    setPasswordWarning("");
    setErrorMessage("")
    const nameToChange = event.target.name;
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [nameToChange]: value }));
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    if (formData.password != formData.confirmPassword) {
      setPasswordWarning("password do not match");
      return;
    }
    setLoading(true)
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.post(`${url}/signup`, formData);
      
      formData.name = "";
      formData.email = "";
      formData.password = "";
      formData.confirmPassword = "";
      setLoading(false)
      setshowLogin(true);
    } catch (err) {
        setErrorMessage(err.response.data.message)
      console.log("Error while signup");
      setLoading(false)
    }
  };
  return (
    <div className="bg-black bg-opacity-20  text-slate-200 px-4 py-5 rounded-md shadow-lg">
      <form onSubmit={handleSignup} className="flex flex-col gap-2">
        <div className="flex flex-col items-start">
          <label htmlFor="name">Name:</label>
          <input
            required
            className="px-2 py-1 rounded-md bg-transparent border-slate-500 border-[0.5px] w-full outline-none"
            id="name"
            name="name"
            value={formData.name}
            type="text"
            onChange={handleChange}
            placeholder="Enter Your Name"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email id:</label>
          <input
            required
            className="px-2 py-1 rounded-md bg-transparent border-slate-500 border w-full outline-none"
            id="email"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleChange}
            placeholder="Enter Your email"
          />
        </div>
        <div>
          <label htmlFor="password"> Password:</label>
          <input
            required
            className="px-2 py-1 rounded-md bg-transparent border-slate-500 border w-full outline-none"
            id="password"
            name="password"
            value={formData.password}
            type="password"
            onChange={handleChange}
            placeholder="Enter Your password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            required
            className="px-2 py-1 rounded-md bg-transparent border-slate-500 border w-full outline-none"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
            placeholder="Enter Your password"
          />
          {passwordWarning !== "" && (
            <div className="text-xs font-bold text-red-500">{passwordWarning}</div>
          )}
          {errorMessage !== "" && (
            <div className="text-xs font-bold text-red-500">{errorMessage}</div>
          )}
        </div>
        <button
          type="submit"
          className=" bg-green-700 hover:bg-green-800 w-fit mx-auto px-4 py-1 rounded-md"
        >
          {loading?"Signing up...":"SignUp"}
        </button>
      </form>
      <div className="w-full border-t border-slate-500 my-3"></div>
      <div className="w-full flex  justify-start gap-2">
        <p>Already have an account</p>
        <span
          onClick={() => setshowLogin(true)}
          className=" underline cursor-pointer"
        >
          Login
        </span>
      </div>
    </div>
  );
}
