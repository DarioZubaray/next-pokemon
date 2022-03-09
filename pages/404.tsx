import Link from 'next/link'
import { Container, Text } from '@nextui-org/react'
import { MainLayout } from '../components/layouts'

export default function FourOhFour() {
  return (
    <MainLayout>
        <Container css={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      }}>

            <Text h3>404  |  Page Not Found</Text>
            <Link href="/">
                <a>
                    Go back home
                </a>
            </Link>
        </Container>
    </MainLayout>
  )
}