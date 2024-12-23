import axios from 'axios';
import { setUsers, setUsersError } from '../app/usersSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Users`,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const GetUsers = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/');
        dispatch(setUsers(response.data));
    } catch (error) {
        dispatch(setUsersError(error.response?.data || error.message));
    }
};