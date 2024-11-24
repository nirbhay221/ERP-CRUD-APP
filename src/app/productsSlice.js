import { createSlice, createAction } from "@reduxjs/toolkit";

export const setProductsError = createAction('setProductsError');
export const newProductsError = createAction('newProductsError');
export const editProductsError = createAction('newProductsError');
export const deleteProductsError = createAction('deleteProductsError');


export const productsSlice = createSlice({
        name: 'products',
        initialState: {
            products: [],
        },
        reducers: {
            setProducts: (state, action) => {
                return { ...state, products : [...action.payload]};
            },
            newProducts: (state, action) => {
                return { ...state, products : [action.payload, ...state.products] };
            },
            editProducts: (state, action) => {
                const UpdatedProducts = state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                );
                return { ...state, products : UpdatedProducts };
            },
            deleteProducts: (state, action) => {
                const filteredProducts = state.products.filter(product => 
                    product.id !== action.payload.id
                );
                return { ...state, products : filteredProducts };
            }
        }
});

export const {setProducts, newProducts, editProducts, deleteProducts } = productsSlice.actions;
export default productsSlice.reducer;