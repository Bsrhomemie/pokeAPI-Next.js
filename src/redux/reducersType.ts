import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { Results } from "@/interface/interface";

interface initialStateInterface {
    types: Results[];
    loading: boolean,
    hasErrors: boolean
}

const initialState: initialStateInterface = {
    types: [],
    loading: false,
    hasErrors: false,
};


export const TypeReducer = createSlice({
    name: "typeList",
    initialState,
    reducers: {
        setTypeList: (state, action) => {
            state.types = action.payload;
        },
    },
    
})

export const { setTypeList } = TypeReducer.actions;
export default TypeReducer.reducer;
