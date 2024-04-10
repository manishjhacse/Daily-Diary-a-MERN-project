import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
export default function Home() {
  const [showLogin, setshowLogin] = useState(true);
  const loggedIn = useSelector((state) => state.loggedIn);
  const navigate = useNavigate();
  
    return (
      <div className="w-full flex justify-center items-center h-full px-2">
        {showLogin ? (
          <LoginForm setshowLogin={setshowLogin} />
        ) : (
          <SignupForm setshowLogin={setshowLogin} />
        )}
      </div>
    );
  
}
