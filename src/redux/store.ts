import { configureStore } from "@reduxjs/toolkit";
import PokemonReducer from './reducers';
import TypeReducer from './reducersType';

export const store = configureStore({
    reducer:{
        pokemon: PokemonReducer,
        types: TypeReducer,
    }
})

