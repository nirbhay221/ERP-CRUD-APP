import {ActionCreators} from '../app/productsReducer';

export const GetProducts = async (dispatch) => {
    try {
        //API CALL
        const products = [
            {id : 1, description : 'Product 1', Quantity : 5},
            {id : 2, description : 'Product 2', Quantity : 10},
            {id : 3, description : 'Product 3', Quantity : 15},
        ];
        dispatch(ActionCreators.setProducts(products))
    }
    catch {
        console.log('Error !')
    }
} 
export const NewProduct = async (dispatch, product) => {
    try {
        dispatch(ActionCreators.newProduct(product));
    }
    catch(error) {
        console.log("Error !", error);
    }
}

export const EditProduct = async (dispatch , product) => {
    try{
        dispatch(ActionCreators.editProduct(product));
    }
    catch{
        console.log('Error !');
    }
}


export const DeleteProduct = async (dispatch , product) => {
    try{
        dispatch(ActionCreators.deleteProduct(product));
    }
    catch{
        console.log('Error !');
    }
}