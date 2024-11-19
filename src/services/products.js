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
    catch(error) {
        console.log('Error fetching products !!!', error)
    }
} 
export const NewProduct = async (dispatch, product) => {
    try {
        const {data} = await axiosInstance.post('', product);
        dispatch(ActionCreators.newProduct(data));
    }
    catch(error) {
        console.log("Error creating products !", error);
    }
}

export const EditProduct = async (dispatch , product) => {
    try{
        
        const {data} = await axiosInstance.put('', product);
        dispatch(ActionCreators.editProduct(data));
    }
    catch(error){
        console.log('Error updating product !', error);
    }
}


export const DeleteProduct = async (dispatch , product) => {
    try{
        console.log('Deleting Product:', product);
        await axiosInstance.delete('', {data : { ...product}});
        dispatch(ActionCreators.deleteProduct(product));
    }
    catch(error){
        console.log('Error deleting product !', error);
    }
}