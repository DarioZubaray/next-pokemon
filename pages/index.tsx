import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';
import { pokeApi } from '../api';
import { MainLayout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <MainLayout title='Listado de pokemones'>
      <h1>Home page</h1>

      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map(pokemon => (
            <PokemonCard pokemon={ pokemon } key={ pokemon.id } />
          ))
        }
      </Grid.Container>
    </MainLayout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  console.log( data )
  const pokemons = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
  }))

  console.log({pokemons})

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
