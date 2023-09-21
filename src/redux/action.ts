import { setPokemonList, setDetail, setFilter, setCount } from './reducers';
import { setTypeList } from './reducersType';
import { Pokemon, Detail, PokemonListType } from "@/interface/interface";
import axios from 'axios';

const fitlerByName = (name: string, getPokemonList: Pokemon[]) => {
  const FilterPokemon = getPokemonList.filter(function (el: Pokemon) {
    return el.name.includes(name);
  });
  return FilterPokemon;
};

const fitlerByType = (type: string, getPokemonList: Pokemon[]) => {
  let PokemonType: Pokemon[] = [];
  getPokemonList.map(
    (el: Pokemon) => {
      let result = el?.types.find((item: { type: { name: string; } }) => item.type.name === type);
      if (result) {
        PokemonType.push(el);
      }
    }
  )
  return PokemonType;
};

const fitlerDisplay = ( getPokemonList: Pokemon[], page:number) => {
  const newPokemon = getPokemonList.filter(function (el: Pokemon, index: number) {
    return el.id >=  page + 1 && el.id <=  page + 20
  });

  return newPokemon;
};

export const feactcPokemon = (offset: number, name: string, type: string, pokemon: Pokemon[]) => {
  return async (dispatch: (type: PokemonListType) => void) => {
    let page = (offset - 1) * 20;
    let checkPokemonData = pokemon.find((x: { id: number }) => x.id == page + 1);
    try {
      if (!checkPokemonData) {
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`
        )
        const pokemonList = await axios.all(response.data.results.map((pokemon: { url: string; }) => axios.get(pokemon.url))).then(
          (data) => data
        );

        const getPokemonList = pokemonList.map(
          (pokemon: any) => ({
            id: pokemon.data.id,
            url: pokemon.data.sprites.other.home.front_default,
            name: pokemon.data.name,
            types: pokemon.data.types,
          }),
        )

        const newPokemon = getPokemonList.filter(function (el: Pokemon, index: number) {
          return !pokemon.some((ex: { id: number; }) => ex.id === el.id)
        });

        const updatePokemonList = new Set([...pokemon, ...newPokemon])
        const setPogkemonList = Array.from(updatePokemonList)

      

        dispatch(setFilter(getPokemonList))
        dispatch(setPokemonList(setPogkemonList))
      } else {
        const setPogkemonList = fitlerDisplay(pokemon, page)
        dispatch(setFilter(setPogkemonList))
      }

    } catch (error) {
      console.log(error)
    }
  }
};


export const feactcFilter = (pokemon:  Pokemon[], name: string, type: string, page: number) => {
  return async (dispatch: (type: { payload: any; type: "pokemonList/setFilter"; }) => void) => {
    let FilterPokemon = []
    if (name && type) {
      const FilterName = fitlerByName(name, pokemon)
      const FilterType = fitlerByType(type, pokemon)
      let Filter: Pokemon[] = []
      FilterName.map(
        (el: Pokemon) => {
          let checked = FilterType.some((t: Pokemon) => t.id == el.id)
          if (checked) {
            Filter.push(el)
          }
        }
      )
      FilterPokemon = Filter
    } else if (name) {
      FilterPokemon = fitlerByName(name, pokemon)
    } else if (type) {
      FilterPokemon = fitlerByType(type, pokemon)
    } else {
      FilterPokemon = fitlerDisplay(pokemon, page)
    }

    dispatch(setFilter(FilterPokemon))

  }
}


export const feactcTypeList = () => {
  return async (dispatch: (api: { payload:  Pokemon[]; type: "typeList/setTypeList"; }) => void) => {
    try {
      let response = await axios.get(
        `https://pokeapi.co/api/v2/type`
      )
      dispatch(setTypeList(response.data.results))

    } catch (error) {
      console.log(error)
    }
  }
};


export const feactcDetail = (id: number) => {
  return async (dispatch: (type: { payload: []; type: "pokemonList/setDetail"; }) => void) => {
    try {
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      )
      const getPokemonDetail: Detail = {
        id: response.data.id,
        url: response.data.sprites.other.home.front_default,
        name: response.data.name,
        types: response.data.types,
        stats: response.data.stats,
        sprites: response.data.sprites,
      }
      
      dispatch(setDetail(getPokemonDetail))
    } catch (error) {
      console.log(error)
    }
  }
};
