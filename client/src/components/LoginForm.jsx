import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeLoggedIn } from "../store/loginSlice";

export default function LoginForm({ setshowLogin }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setErrorMessage("");
    const nameToChange = event.target.name;
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [nameToChange]: value }));
  };
  axios.defaults.withCredentials = true;
  const handleLogin = async (event) => {
    event.preventDefault();
    if (formData.password == "" || formData.email === "") {
      setErrorMessage("Please fill all the details.");
      return;
    }
    setLoading(true);
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.post(`${url}/login`, {
        formData,
        withCredentials: true,
      });
      setLoading(false);
      dispatch(changeLoggedIn(true));
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      console.log("Error while login");
      setLoading(false);
    }
  };
  return (
    <div className="bg-black bg-opacity-20  text-slate-200 px-4 py-5 rounded-md shadow-lg">
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email id:</label>
          <input
            className="px-2 py-1 rounded-md bg-transparent border-white border w-full outline-none"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter Your email"
          />
        </div>
        <div>
          <label htmlFor="password"> Password:</label>
          <input
            className="px-2 py-1 rounded-md bg-transparent border-white border w-full outline-none"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter Your password"
          />
        </div>
        {errorMessage != "" && (
          <div className="text-xs font-bold text-red-500">{errorMessage}</div>
        )}
        <button
          type="submit"
          className=" bg-green-700 hover:bg-green-800  w-fit mx-auto px-4 py-1 rounded-md"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
      <div className="w-full flex justify-end">
        <Link to="/forgetpassword" className="underline text-xs">
          forgot password
        </Link>
      </div>
      <div className="w-full border-t border-slate-500 my-3"></div>
      <div className="w-full flex  justify-start gap-2">
        <p>Don't have an account</p>
        <span
          onClick={() => setshowLogin(false)}
          className="underline cursor-pointer"
        >
          Sign up
        </span>
      </div>
    </div>
  );
}
