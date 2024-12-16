const initialState = {
    products : [],
}

export const ActionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    NEW_PRODUCT: 'NEW_PRODUCT',
    EDIT_PRODUCT: 'EDIT_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
}

export const ActionCreators = {
    setProducts : payload => ({ type : ActionTypes.SET_PRODUCTS, payload }),
    newProduct: payload => ({type : ActionTypes.NEW_PRODUCT, payload}),
    editProduct: payload => ({type : ActionTypes.EDIT_PRODUCT, payload}),
    deleteProduct: payload => ({type : ActionTypes.DELETE_PRODUCT, payload}),
}

export default (state = initialState , action) => {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products : [...action.payload]};
        case ActionTypes.NEW_PRODUCT:
            console.log("Adding new product : ", action.payload);
            return { ...state, products : [action.payload, ...state.products] };
        
        case ActionTypes.EDIT_PRODUCT:
            const UpdatedProducts = state.products.map(product =>
                product.id === action.payload.id ? action.payload : product
            );
            return { ...state, products : UpdatedProducts };

        case ActionTypes.DELETE_PRODUCT:
            const filteredProducts = state.products.filter(product => 
                product.id !== action.payload.id
            );
            return { ...state, products : filteredProducts };
        default:
            return state;

    }
}