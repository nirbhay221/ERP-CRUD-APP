import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Button } from 'react-bootstrap';
import { logout } from "../app/authenticationSlice";

const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();

    const navLinkStyle = {
        color: 'black',
        textDecoration: 'none',
        margin: '0 10px',
        padding: '8px 12px',
        borderRadius: '4px',
    };

    const activeStyle = {
        fontWeight: 'bold',
        backgroundColor: '#e0e0e0',
    };

    return (
        <Nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e4fff2', padding: '10px' }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <h1 style={{ fontFamily: 'Brush Script MT, cursive', margin: 0 }}>
                    ERP Website
                </h1>
                <div className="navbar-nav">
                    {isLoggedIn ? (
                       <> 
                    <NavLink 
                        to="/statistics" 
                        style={({ isActive }) => ({
                            ...navLinkStyle,
                            ...(isActive ? activeStyle : {})
                        })}
                    >
                        Statistics
                    </NavLink>
                    <NavLink 
                        to="/dashboard" 
                        style={({ isActive }) => ({
                            ...navLinkStyle,
                            ...(isActive ? activeStyle : {})
                        })}
                    >
                        Dashboard
                    </NavLink>
                    
                    <Button 
                            variant='outline-primary' 
                            onClick={() => dispatch(logout())}
                        >
                            Log out
                        </Button>
                    </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <NavLink 
                        to="/signup" 
                        style={({ isActive }) => ({
                            ...navLinkStyle,
                            ...(isActive ? activeStyle : {})
                        })}
                    >
                        Sign Up
                    </NavLink>
                    <NavLink 
                        to="/signin" 
                        style={({ isActive }) => ({
                            ...navLinkStyle,
                            ...(isActive ? activeStyle : {})
                        })}
                    >
                        Sign In
                    </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </Nav>
    );
};

export default Navbar;