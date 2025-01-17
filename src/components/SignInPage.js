import { useState } from "react";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { SignIn } from "../services/authentication";
import { useNavigate} from "react-router-dom";

import { userAuthenticated } from '../app/authenticationSlice';

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const result = await SignIn(dispatch, {username, password});
            console.log("Login result:", result.success); 
            console.log("Session Storage Item" , sessionStorage.getItem('token'));
            if (result.success) {
                dispatch(userAuthenticated({
                    token: result.data.token,  
                    userName: result.data.userName,  
                }));
                console.log("Session Storage Item after dispatch: ", sessionStorage.getItem('token')); 
                

                navigate('/');
            }
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    return <div style = {{width : '30rem', margin : 'auto', paddingTop: '8px'}}>
        <Form onSubmit = {handleSignIn} >
            <h4 stype = {{
                textAlign : 'center'
            }}>Welcome Back</h4>
            <InputGroup className = 'mb-3'>
                <FormControl placeholder = 'Username'
                onChange = {event => setUsername(event.target.value)}>
                    
                </FormControl>
            </InputGroup>
            <InputGroup className = 'mb-3'>
                <FormControl placeholder = 'Password' type = 'password'
                onChange = {event => setPassword(event.target.value)}>
                </FormControl>
            </InputGroup>
            <Button type = 'submit' variant = 'primary' style = {{
                margin : 'auto', display : 'block', width : '10rem'
            }} >
                Sign In
            </Button>
        </Form>

    </div>
}


export default SignInPage;