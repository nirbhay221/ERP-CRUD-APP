import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Button } from 'react-bootstrap';
import { logout } from "../app/authenticationSlice";
import { FaChartLine, FaTachometerAlt, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();

    const navLinkStyle = {
        color: '#fff', 
        textDecoration: 'none',
        margin: '0 15px',
        padding: '8px 15px',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    };

    const activeStyle = {
        fontWeight: 'bold',
        backgroundColor: '#4A90E2', 
    };

    const navContainerStyle = {
        backgroundColor: '#0e0e0e', 
        width: '100%', 
    };

    return (
        <Nav className="navbar navbar-expand-lg" style={navContainerStyle}>
            <div className="container-fluid d-flex justify-content-between align-items-center w-100">
                <h1 style={{ fontFamily: 'Brush Script MT, cursive', margin: 0, color: '#fff' }}>
                    ERP Website
                </h1>
                <div className="navbar-nav d-flex">
                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to="/statistics"
                                style={({ isActive }) => ({
                                    ...navLinkStyle,
                                    ...(isActive ? activeStyle : {})
                                })}
                            >
                                <FaChartLine style={{ marginRight: '8px' }} />
                                Statistics
                            </NavLink>
                            <NavLink
                                to="/dashboard"
                                style={({ isActive }) => ({
                                    ...navLinkStyle,
                                    ...(isActive ? activeStyle : {})
                                })}
                            >
                                <FaTachometerAlt style={{ marginRight: '8px' }} />
                                Dashboard
                            </NavLink>
                            <Button
                                variant="outline-light"
                                onClick={() => dispatch(logout())}
                                style={{
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    padding: '5px 15px',
                                    color: '#fff',
                                    borderColor: '#fff',
                                }}
                            >
                                <FaSignOutAlt style={{ marginRight: '8px' }} />
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
                                <FaUserPlus style={{ marginRight: '8px' }} />
                                Sign Up
                            </NavLink>
                            <NavLink
                                to="/signin"
                                style={({ isActive }) => ({
                                    ...navLinkStyle,
                                    ...(isActive ? activeStyle : {})
                                })}
                            >
                                <FaSignInAlt style={{ marginRight: '8px' }} />
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
