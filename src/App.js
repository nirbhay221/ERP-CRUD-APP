import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUp";
import HomePage from "./components/HomePage";
import React, { useEffect, useState } from "react";
import { userAuthenticated } from "./app/authenticationSlice";
import StatisticsPage from "./components/StatisticsPage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import {RiSettings2Line} from "react-icons/ri";
import { MdOutlineEventSeat } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { SiMaterialdesignicons } from "react-icons/si";

const App = () => {
  const isLoggedIn = useSelector((state) => 
    state.authenticationSlice ? state.authenticationSlice.isLoggedIn : false
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token){
      dispatch(userAuthenticated({token}));
    }
  }, [dispatch]);
  const menus = [
    {name: "Dashboard", link: '/', icon: MdOutlineDashboard},
    {name: "User", link: '/', icon: AiOutlineUser},
    {name: "Products", link: '/', icon: SiMaterialdesignicons},
    {name: "Projects", link: '/', icon: GrProjects },
    {name: "Events", link: '/', icon: MdOutlineEventSeat },
    {name: "Settings", link: '/', icon: RiSettings2Line, margin : true}
  ]
  const [open, setOpen] = useState(true)
  console.log("Logged In", isLoggedIn)
  return (
    <BrowserRouter>    
    <div className = "flex">
    <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72": "w-16"} duration-500 text-gray-100 px-4`}>
      <div className = "py-3 flex justify-end">
        <HiMenuAlt3 size={26} className = "cursor-pointer" onClick={() => setOpen(!open)}/>
      </div>
      <div className = "mt-4 flex flex-col gap-4 relative">
      {
        menus?.map((menu, i) => (
        <Link to = {menu?.link} key ={i} 
          className={`${menu?.margin && "mt-10"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}>
          <div>
            {React.createElement(menu?.icon, {size: '20'})}
          </div>
          <h2 style = {{transitionDelay: `${i+3}00ms`, }} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`} >{menu?.name}</h2>
          <h2 className= {`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}> {menu?.name}</h2>
        </Link>
        ))
        }
      </div>
    </div>
    <div >
    <Navbar/>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <HomePage /> : <SignInPage />} 
        />
        <Route 
          path="/signup" 
          element={isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} 
        />
        <Route 
          path="/signin" 
          element={isLoggedIn ? <Navigate to="/" /> : <SignInPage />} 
        />
        <Route 
          path="/statistics" 
          element={isLoggedIn ? <StatisticsPage/>: <SignInPage />} 
        />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard/>: <Dashboard />} 
        />
        <Route 
          path="*" 
          element={<h2>Page not found!</h2>} 
        />
      </Routes>
      </div>
      </div>
    </BrowserRouter>
    
    
  );
};

export default App;