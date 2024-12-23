import {newProducts, editProducts, deleteProducts, setProductsError, newProductsError, editProductsError, deleteProductsError} from '../app/productsSlice';
import {newProjects, editProjects, deleteProjects, setProjectsError, newProjectsError, editProjectsError, deleteProjectsError} from '../app/projectsSlice';


import {toast} from 'react-toastify';

const ToastMiddleware = () => next => action => {
    switch (action.type){
        case newProducts.type:
            toast.success("New Product added successfully");
            break;
        case editProducts.type:
            toast.success("Product edited successfully");
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
            toast.error("Error in editing products !!");
            break;
        case deleteProductsError.type:
            toast.error("Error in deleting products !!");
            break;
        case newProjects.type:
            toast.success("New Project added successfully");
            break;
        case editProjects.type:
            toast.success("Project edited successfully");
            break;
        case deleteProjects.type:
            toast.success("Project deleted successfully");
            break;
        case setProjectsError.type:
            toast.error("Error in loading projects !!");
            break;
        case newProjectsError.type:
            toast.error("Error in adding new projects !!");
            break;
        case editProjectsError.type:
            toast.error("Error in editing projects !!");
            break;
        case deleteProjectsError.type:
            toast.error("Error in deleting projects !!");
            break;
        default:
            break;

    }
     return next(action);
}

export default ToastMiddleware;
