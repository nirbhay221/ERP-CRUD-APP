import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiSettings2Line } from "react-icons/ri";
import { MdOutlineEventSeat } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { SiMaterialdesignicons } from "react-icons/si";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUp";
import HomePage from "./components/HomePage";
import StatisticsPage from "./components/StatisticsPage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { userAuthenticated } from "./app/authenticationSlice";
import ProductForm from "./components/ProductForm";
import ProductsPage from "./components/ProductsPage";
import ProjectForm from "./components/ProjectForm";
import ProjectsPage from "./components/projectsPage";
import EventsPage from "./components/eventsPage";


const App = () => {
  const isLoggedIn = useSelector((state) =>
    state.authenticationSlice ? state.authenticationSlice.isLoggedIn : false
  );
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "User", link: "/user", icon: AiOutlineUser },
    { name: "Products", link: "/products", icon: SiMaterialdesignicons },
    { name: "Projects", link: "/projects", icon: GrProjects },
    { name: "Events", link: "/events", icon: MdOutlineEventSeat },
    { name: "Settings", link: "/settings", icon: RiSettings2Line, margin: true },
  ];

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(userAuthenticated({ token }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex">
<<<<<<< Updated upstream
        {
          isLoggedIn ? (<div
            className={`bg-gray-900 min-h-screen ${
              open ? "w-72" : "w-16"
            } duration-500 text-gray-100 px-4`}
          >
            <div className="py-3 flex justify-end">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer text-gray-300 hover:text-gray-100"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {menus.map((menu, i) => (
                <Link
                  to={menu.link}
                  key={i}
=======
        {isLoggedIn ? (<div
          className={`bg-gray-900 min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer text-gray-300 hover:text-gray-100"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {menus.map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={`${
                  menu.margin && "mt-10"
                } group flex items-center gap-4 text-sm font-medium p-2 hover:bg-gray-800 rounded-md no-underline text-gray-300`}
              >
                <div className="flex items-center justify-center">
                  {React.createElement(menu.icon, { size: "20" })}
                </div>
                <h2
                  style={{ transitionDelay: `${i + 3}00ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  } text-sm`}
                >
                  {menu.name}
                </h2>
                <h2
>>>>>>> Stashed changes
                  className={`${
                    menu.margin && "mt-10"
                  } group flex items-center gap-4 text-sm font-medium p-2 hover:bg-gray-800 rounded-md no-underline text-gray-300`}
                >
                  <div className="flex items-center justify-center">
                    {React.createElement(menu.icon, { size: "20" })}
                  </div>
                  <h2
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    } text-sm`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit text-sm`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
<<<<<<< Updated upstream
  ) : (
    <></>
  )
        }
=======
        </div>
) : (<div/>)}
>>>>>>> Stashed changes
        <div className="flex-1 bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={isLoggedIn ? <HomePage /> : <SignInPage />} />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUpPage />}
            />
            <Route
              path="/products"
              element={isLoggedIn ? <ProductsPage/> : <SignUpPage />}
            />
            <Route path = "/projects" element = {isLoggedIn ? <ProjectsPage></ProjectsPage>: <SignUpPage/>} />
            <Route path = "/events" element = {isLoggedIn ? <EventsPage />: <SignUpPage/>} />

            <Route
              path="/signin"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignInPage />}
            />
            <Route
              path="/statistics"
              element={isLoggedIn ? <StatisticsPage /> : <SignInPage />}
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Dashboard />}
            />
            <Route path="*" element={<h2>Page not found!</h2>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
