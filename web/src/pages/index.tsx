import styles from '../styles/pages/index.module.scss'
import Link from 'next/link'

import Carousel from '../components/Carousel'
import { GetStaticProps } from 'next'
import { api } from '../services/api'

import Card from '../components/Card'

export default function Home({ image1, image2, image3 }) {

  return (
    <div className={styles.container}>
      <header className={styles.header}>

        <nav>
          <img src="/logo.png" alt="Logo imagem" />

          <Link href="/login">
            <li>Entrar</li>
          </Link>
        </nav>
      </header>

      <main className={styles.principal}>
        <Carousel isDefault={image1.isDefault ? true : false} image1={image1} image2={image2} image3={image3} />


        <h1>Informações importantes</h1>

        <section className={styles.cards}>
          <Card
            image="vacina.jpg"
            link="https://www.gov.br/saude/pt-br/vacinacao#doses-aplicadas"
            title="Não esqueça de tomar!"
          >
            Hoje em dia tomar vacina não é apenas cuidar de sim mesmo, e sim do
            próximo, hoje no Brasil foram vacinadas em torno de 66.934.363
            pessoas. Mesmo assim o nosso país se encontra em um dos últimos a
            realizar a vacinação...
          </Card>

          <Card
            image="quant-vacina.jpg"
            link="https://www.gov.br/saude/pt-br/vacinacao#vacinas-disponiveis"
            title="Vacinas disponíveis"
          >
            Há diversos tipos e doses de vacinas criadas contra o COVID19 hoje,
            todas as vacinas distribuidas pelo governo foram aprovados pela
            Agência Nacional de Vigilância Sanitária (Anvisa). Clique no botão
            abaixo e veja as vacinas distribuídas e aprovadas.
          </Card>

          <Card
            image="protection.jpg"
            link="https://www.gov.br/saude/pt-br/vacinacao#variantes"
            title="Mutação do vírus"
          >
            Tome cuidado, mesmo após vacinado(a) você pode adquirir COVID19, pois
            seu vírus têm grande potencial de mutação, oque é natural e esperado
            durante seu ciclo evolutivo, saiba mais.
          </Card>
        </section>

        <section className={styles.why}>
          <img src="/vacine.svg" alt="Imagem de Vacinação" />

          <div>
            <h2>Por que devo me vacinar?</h2>
            <p>Quem não se vacina não coloca apenas a própria saúde em risco, mas
              também a de seus familiares e outras
              pessoas com quem tem contato, além de contribuir para aumentar a
              circulação de doenças. <strong>
              Tomar vacinas é a melhor maneira de se proteger
              de uma variedade de doenças graves e de suas complicações, que podem
              até levar à morte.</strong></p>
          </div>
        </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('carrossel')
  const carousel = response.data[0]

  const defaultImages = {
    defaultImage1: {
      id: '1',
      name: 'Cuidados com o vírus',
      description: 'Ele pode mudar!',
      path: '/protection.jpg',
      created_at: String(new Date()),
      updated_at: String(new Date()),
      isDefault: true
    },
    defaultImage2: {
      id: '2',
      name: 'Vacinar',
      description: 'Tome a vacina de forma correta',
      path: '/vacina.jpg',
      created_at: String(new Date()),
      updated_at: String(new Date()),
      isDefault: true
    },
    defaultImage3: {
      id: '3',
      name: 'Variedade',
      description: 'Sabia que existem vários tipos de vacina?',
      path: '/quant-vacina.jpg',
      created_at: String(new Date()),
      updated_at: String(new Date()),
      isDefault: true
    }
  }

  if (carousel) {
    return {
      props: {
        image1: carousel.image1,
        image2: carousel.image2,
        image3: carousel.image3,
      },
      revalidate: 20
    }
  }

  return {
    props: {
      image1: defaultImages.defaultImage1,
      image2: defaultImages.defaultImage2,
      image3: defaultImages.defaultImage3
    },
    revalidate: 20
  }
}
