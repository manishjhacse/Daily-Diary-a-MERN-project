import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateNew from "./pages/CreateNew";
import Diary from "./pages/Diary";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedIn } from "./store/loginSlice";
import PageNotFound from "./pages/PageNotFound";
import ForgetPassword from "./pages/ForgetPassword";
import { GoHeartFill } from "react-icons/go";

function App() {
  const token = localStorage.getItem("token");
  // const token = sessionStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const loggedIn=useSelector((store)=>store.loggedIn)
  const dispatch=useDispatch()
  const isloggedinFunction=async()=>{
    try{
        const url = import.meta.env.VITE_BASE_URL;
        const res = await axios.get(`${url}/isloggedin`, {
            withCredentials: true, 
        });
        if(res.data.success){
            dispatch(changeLoggedIn(true))
        }else{
          dispatch(changeLoggedIn(false))
        }
    }catch (err) {
        console.log(err)
        console.log(err.response.data.message);
      }
}
useEffect(()=>{
  isloggedinFunction();
},[])
  return (
    <div
      className={`prevent-select relative bg-green-900 hideScrollbar overflow-x-hidden overflow-y-scroll bg-center bg-no-repeat h-screen w-screen flex`}
    >
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute >
              <Dashboard />
             </PrivateRoute>
          }
        />
        <Route
          path="/createnew"
          element={
            <PrivateRoute>
              <CreateNew />
             </PrivateRoute>
          }
        />
        <Route
          path="/diary/:diaryId"
          element={
            <PrivateRoute >
              <Diary />
             </PrivateRoute>
          }
        />
        <Route path="forgetpassword" element={<ForgetPassword/>} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <p  className="fixed w-full justify-center text-white bottom-0 flex items-center gap-1 left-1/2 -translate-x-1/2">Made with <GoHeartFill className="text-red-500" /> by <a className="text-green-500 font-bold" href="https://manishkumarjha.tech" target="_blank">Manish</a></p>
    
    </div>
  );
}

export default App;
