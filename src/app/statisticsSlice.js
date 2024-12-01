import {createSlice} from '@reduxjs/toolkit';

export const statisticsSlice = createSlice({
    name : 'statistics',
    initialState : {
        productQuantityPerCategory : [],
    },
    reducers : {
        setProductQuantityPerCategory : (state, action) => {
            return { ...state, productQuantityPerCategory: {...action.payload}};
        }
    }
})

export const {setProductQuantityPerCategory} = statisticsSlice.actions;
export default statisticsSlice.reducer;