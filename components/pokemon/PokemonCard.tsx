import { FC } from 'react'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { SmallPokemon } from '../../interfaces'
import { useRouter } from 'next/router'

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props>= ({ pokemon }) => {

    const router = useRouter()
    const onPokemonClick = () => {
        router.push(`/name/${pokemon.name}`)
    }

  return (
    <Grid xs={ 12 } sm={ 6 } md={ 3 } lg={ 2 } xl={ 1 }>
        <Card hoverable clickable onClick={ onPokemonClick }>
            <Card.Body css={{ p: 1}}>
                <Card.Image src={ pokemon.img } width="100%" height={ 140 } />
            </Card.Body>
            <Card.Footer>
                <Row justify='space-between'>
                    <Text transform='capitalize'>{ pokemon.name }</Text>
                    <Text>#{ pokemon.id }</Text>
                </Row>
            </Card.Footer>
        </Card>
    </Grid>
  )
}
