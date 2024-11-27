import { NavLink } from "react-router-dom";  
import { useDispatch, useSelector } from "react-redux";
import { Nav, Button } from 'react-bootstrap';
import { logout } from "../app/authenticationSlice";

const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();

    return (
        <Nav className='navbar' style={{ backgroundColor: '#e4fff2' }}>
            <h1 style={{ fontFamily: 'Brush Script MT, cursive' }}>
                My Products
            </h1>
            {
                isLoggedIn ? (
                    <Button variant='link' href='/signin' onClick={() => dispatch(logout())}>Log out</Button>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <NavLink to="/signup">Sign Up</NavLink>
                        <NavLink to="/signin" style={{ marginLeft: '1rem' }}>Sign In</NavLink>
                    </div>
                )
            }
        </Nav>
    );
};

export default Navbar;
