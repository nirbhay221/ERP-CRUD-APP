import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUp";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import { userAuthenticated } from "./app/authenticationSlice";
import { Navbar } from "react-bootstrap";

const App = () => {
  const isLoggedIn = useSelector((state) => 
    state.authenticationSlice ? state.authenticationSlice.isLoggedIn : false
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null){
      dispatch(userAuthenticated({token}));
    }
  }, []);
  console.log("Logged In", isLoggedIn)
  return (
    <BrowserRouter>
    <Navbar></Navbar>
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
          path="*" 
          element={<h2>Page not found!</h2>} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;