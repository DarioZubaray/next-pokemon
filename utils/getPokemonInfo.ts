import { pokeApi } from '../api'
import { PokemonResponse } from '../interfaces'

export const getPokemonInfo = async ( nameOrId : string ) => {
    const { data } = await pokeApi.get<PokemonResponse>(`/pokemon/${nameOrId}`)

    return {
        props: {
            pokemon: {
                name: data.name,
                id: data.id,
                sprites: data.sprites,
                types: data.types,
                abilities: data.abilities,
                stats: data.stats
            }
        }
    }
}

