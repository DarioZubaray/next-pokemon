import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts'
import { FavoritePokemons } from '../../components/pokemon'
import { NoFavorites } from '../../components/ui';
import localFavorite from '../../utils/localFavorite'

export const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorite.allFavorites() );
  }, []);

  return (
    <MainLayout title='Favoritos'>
        {
          favoritePokemons.length === 0 
            ? ( <NoFavorites /> )
            : ( <FavoritePokemons pokemons={favoritePokemons} /> )
        }
    </MainLayout>
  )
}

export default FavoritesPage