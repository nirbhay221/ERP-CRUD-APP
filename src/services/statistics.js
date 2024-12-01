import axios from 'axios';
import {setProductQuantityPerCategory} from '../app/statisticsSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/statistics`,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers = {authorization : 'Bearer ' + sessionStorage.getItem('token')};
    return config;
});

export const getProductsPerCategory = async (dispatch) => {
    try {
        const {data} = await axiosInstance.get();
        dispatch(setProductQuantityPerCategory(data));
    }
    catch (error){
        console.log(error);
    }
}