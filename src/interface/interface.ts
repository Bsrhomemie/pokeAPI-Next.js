
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: Types[];
}

export interface Detail {
  id: number;
  name: string;
  url: string;
  types: Types[];
  stats: Stats[];
  sprites: Sprites
}

export interface Sprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: any
}


export interface Stats {
  base_stat: number;
  effort: number
  stat: {name: string; url: string; }
}

export interface Types {
  slot: number;
  type: {name: string; url: string; }
}

export interface Results {
  name: string;
  url: string;
}


export interface PokemonListType {
 payload: Pokemon; 
 type: "pokemonList/setFilter" | "pokemonList/setPokemonList"; 
}


