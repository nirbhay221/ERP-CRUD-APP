import { setProducts, newProducts, editProducts, deleteProducts } from '../app/productsSlice';
import axios from 'axios';
import { setProductsError, editProductsError, newProductsError, deleteProductsError } from '../app/productsSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Products`,
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

export const GetProducts = async (dispatch) => {
    try {
        console.log('Fetching products with base URL:', axiosInstance.defaults.baseURL);
        
        const response = await axiosInstance.get('/');
        
        console.log('Products fetch response:', response.data);
        
        dispatch(setProducts(response.data));
    } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        dispatch(setProductsError(error.response ? error.response.data : error.message));
    }
};

export const NewProduct = async (dispatch, product) => {
    try {
        const licenseTypeMapping = {
            "Free": 0,
            "Paid": 1,
            "OpenSource": 2
        };

        const productWithEnum = {
            ...product,
            licenseType: licenseTypeMapping[product.licenseType], 
            productDto: { 
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                licenseType: licenseTypeMapping[product.licenseType],
                userId: product.User,
                ProductProjects: product.ProductProjects || [] 
            }
        };

        const { data } = await axiosInstance.post('/', productWithEnum);
        console.log("New Product Added:", data);
        dispatch(newProducts(data));
    } catch (error) {
        console.error('Full error object:', error);
        console.error('Error creating product:', error.response ? error.response.data : error.message);
        dispatch(newProductsError(error.response ? error.response.data : error.message));
    }
};


export const EditProduct = async (dispatch, product) => {
    try {
        console.log('Product before sending:', product);

        const licenseTypeMapping = {
            "Free": 0,
            "Paid": 1,
            "OpenSource": 2
        };

        const productWithEnum = {
            ...product,
            licenseType: licenseTypeMapping[product.licenseType] || product.licenseType, 
        };

        const { data } = await axiosInstance.put(`/${product.id}`, productWithEnum);
        
        dispatch(editProducts(data));
    } catch (error) {
        console.error('Error editing product:', error.response ? error.response.data : error.message);
        dispatch(editProductsError(error.response ? error.response.data : error.message));
    }
};


export const DeleteProduct = async (dispatch, product) => {
    try {
        console.log('Deleting Product:', product);
        await axiosInstance.delete('/', { data: { ...product } });
        dispatch(deleteProducts(product));
    } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        dispatch(deleteProductsError(error.response ? error.response.data : error.message));
    }
};