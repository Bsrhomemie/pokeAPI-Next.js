import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon, Detail, Results } from "@/interface/interface";

interface initialStateInterface {
    pokemon: Pokemon[];
    current: number;
    detail: Results[];
    filter: Pokemon[];
    count: number;
}

const initialState: initialStateInterface = {
    pokemon: [],
    current: 1,
    detail: [],
    filter: [],
    count: 1281
};


export const PokemonReducer = createSlice({
    name: "pokemonList",
    initialState,
    reducers: {
        setPokemonList: (state, action) => {
            state.pokemon = action.payload;
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
        setDetail: (state, action) => {
            state.detail = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
    },

})

export const { setPokemonList, setCurrent, setDetail, setFilter, setCount } = PokemonReducer.actions;
export default PokemonReducer.reducer;
