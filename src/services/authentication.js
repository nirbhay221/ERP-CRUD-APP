import axios from 'axios';
import { userAuthenticated } from '../app/authenticationSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
});

export const SignUp = async (dispatch, credentials) => {
    try{
        
        
        const {data} = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
    }
    catch {
        console.log('Error!');

    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const payload = {
            id: 0,
            username: credentials.username,
            password: credentials.password,
            email: "string",
        };
        const { data } = await axiosInstance.post('/signin', payload);
        console.log("Login response:", data);
        dispatch(userAuthenticated(data));
        return { success: true, data };
    } catch(error) {
        console.log('Sign In Error!!', error);
        return { success: false, error };
    }
}