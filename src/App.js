import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUp";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import { userAuthenticated } from "./app/authenticationSlice";
import { Navbar } from "react-bootstrap";
import StatisticsPage from "./components/StatisticsPage";

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

  console.log("Logged In", isLoggedIn)
  return (
    <BrowserRouter>
    <Navbar />
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
          path="*" 
          element={<h2>Page not found!</h2>} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;