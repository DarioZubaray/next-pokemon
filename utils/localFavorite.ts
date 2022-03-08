
const toggleFavorite = ( id: Number ): void => {
    console.log('Toggle Favorite')

    let favorites: Number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    if (favorites.includes(id)) {
        favorites.filter(pokeId => pokeId !== id)
    } else {
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existInFav = ( id: number): boolean => {

    if ( typeof window === 'undefined') return false

    const favorites: Number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    return favorites.includes(id)
}

const allFavorites = () => {
    if ( typeof window === 'undefined') return false
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

export default {
    toggleFavorite,
    existInFav,
    allFavorites
}