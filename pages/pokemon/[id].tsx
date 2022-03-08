import { useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { Button, Card, Container, Grid, Image, Progress, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti'

import { MainLayout } from '../../components/layouts'
import { getPokemonInfo, localFavorites } from '../../utils';
import { PokemonResponse } from '../../interfaces';

interface Props {
    pokemon: PokemonResponse
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const [ isInFav, setIsInFav ] = useState(localFavorites.existInFav(pokemon.id))

    const getStatName = (stat: string) => {
        switch(stat) {
            case 'hp':
                return 'Health Points'
            case 'attack':
                return 'Attack'
            case 'defense':
                return 'Defense'
            case 'special-attack':
                return 'Sp Attack'
            case 'special-defense':
                return 'Sp Defense'
            case 'speed':
                return 'Speed'
            default:
                return ''
        }
    }

    const onToggleClick = () => {
        console.log('onToggleClick')
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFav(!isInFav)

        if ( isInFav ) return

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

    return (
        <MainLayout title={`Pokémon: #${pokemon.id} - ${pokemon.name}`}>

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>

                <Grid xs={12} sm={4} >
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button
                                color="gradient"
                                ghost={ !isInFav }
                                onClick={ onToggleClick }
                            >
                                { isInFav ? 'En favoritos' : 'Guardar en favoritos' } 
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            
                            <Text size={30}>Sprites:</Text>

                            <Container direction='row' display='flex' gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />

                            </Container>
                        </Card.Body>

                    </Card>
                </Grid>

            </Grid.Container>

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4} >
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Text size={30} css={{ mb: 10 }}>Types:</Text>
                            {pokemon.types.map(type => (

                                <Button key={type.type.name} flat color="primary" auto css={{ mb: 5}}>
                                    {type.type.name}
                                </Button>
                            ))}

                            <Text size={30} css={{ mb: 10 }}>Abilities:</Text>
                            {
                                pokemon.abilities.map(ability => (
                                    <Button css={{ mb: 5}}>{ ability.ability.name }</Button>
                                ))
                            }
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Header>
                            <Text size={30}>Stats: ({ pokemon.stats.reduce( (prev, current) => prev + current.base_stat, 0) })</Text>
                        </Card.Header>
                        <Card.Body>

                            {
                                pokemon.stats.map( stat => (
                                    <Grid>
                                        <Text size={ 20 }>{ getStatName(stat.stat.name) }: { stat.base_stat }</Text>
                                        <Progress
                                            color={ stat.base_stat < 60 ? 'error' : stat.base_stat < 100 ? 'warning' : 'success'}
                                            value={ stat.base_stat * 100 / 255 } />
                                    </Grid>
                                ))
                            }

                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>

        </MainLayout>
    )
}

// You should use getStaticPaths if you’re statically pre-rendering pages 
// that use dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {

    const pokemones = [...Array(151)].map((value, index) => `${index + 1}`)

    return {
        paths: pokemones.map(id => ({
            params: { id }
        })),
        fallback: false
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available 
//      at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) 
//  and be very fast — getStaticProps generates HTML and JSON files, 
//  both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }
    return await getPokemonInfo(id)
}

export default PokemonPage