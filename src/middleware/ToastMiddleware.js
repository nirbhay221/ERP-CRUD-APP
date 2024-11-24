import {newProducts, editProducts, deleteProducts, setProductsError, newProductsError, editProductsError, deleteProductsError} from '../app/productsSlice';
import {toast} from 'react-toastify';

const ToastMiddleware = () => next => action => {
    switch (action.type){
        case newProducts.type:
            toast.success("New Product added successfully");
            break;
        case editProducts.type:
            toast.success("Product Edited successfully");
            break;
        case deleteProducts.type:
            toast.success("Product deleted sucessfully");
            break;
        case setProductsError.type:
            toast.error("Error in loading products !!");
            break;
        case newProductsError.type:
            toast.error("Error in adding new products !!");
            break;
        case editProductsError.type:
            toast.error("Error in editing new products !!");
            break;
        case deleteProductsError.type:
            toast.error("Error in deleting new products !!");
            break;
        default:
            break;

    }
     return next(action);
}

export default ToastMiddleware;
