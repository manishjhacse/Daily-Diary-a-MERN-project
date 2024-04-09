import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home() {
  const [showLogin, setshowLogin] = useState(true);
  const loggedIn = useSelector((state) => state.loggedIn);
  const navigate = useNavigate();
  // const isloggedin=async()=>{
  //     try{
  //         const url = import.meta.env.VITE_BASE_URL;
  //         const res = await axios.get(`${url}/isloggedin`, {
  //             withCredentials: true,
  //         });
  //         if(res.data.success){
  //             // navigate("/dashboard")
  //         }
  //     }catch (err) {
  //         console.log(err)
  //         console.log(err.response.data.message);
  //       }
  // }
  useEffect(() => {
    // isloggedin();
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, []);

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
