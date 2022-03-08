export interface PokemonListResponse {
    count:    number;
    next?:     string;
    previous?: string;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    id: string;
    name: string;
    url:  string;
    img: string;
}
