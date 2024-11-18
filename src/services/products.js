import {ActionCreators} from '../app/productsReducer';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44345/Products',
});

export const GetProducts = async (dispatch) => {
    try {
        //API CALL
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setProducts(data))
    }
    catch {
        console.log('Error !')
    }
} 
export const NewProduct = async (dispatch, product) => {
    try {
        const {data} = await axiosInstance.post('', product);
        dispatch(ActionCreators.newProduct(data));
    }
    catch(error) {
        console.log("Error !", error);
    }
}

export const EditProduct = async (dispatch , product) => {
    try{
        
        await axiosInstance.put('', product);
        dispatch(ActionCreators.editProduct(product));
    }
    catch{
        console.log('Error !');
    }
}


export const DeleteProduct = async (dispatch , product) => {
    try{
        
        await axiosInstance.delete('', product);
        dispatch(ActionCreators.deleteProduct(product));
    }
    catch{
        console.log('Error !');
    }
}