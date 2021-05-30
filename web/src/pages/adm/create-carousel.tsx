import styles from '../../styles/pages/adm.module.scss'
import React, { FormEvent, useState } from "react";

import { parseCookies } from "nookies";

import { api } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth"
import { SidebarDrawerProvider } from '../../contexts/SidebarDrawerContext'

import {
  ChakraProvider,
  Flex,
  Spinner,
  SimpleGrid,
  Box,
  Image,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText
} from '@chakra-ui/react'

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useRouter } from 'next/router';

export default function CreateCarousel({ user, images }) {
  const [loading, setLoading] = useState(false)
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')

  const router = useRouter()

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    try {
      if (image1 === '' || image2 === '' || image3 === '') {
        alert('Preencha todos os dados')
      } else {
        setLoading(true)
        await api.post('carrossel', {
          image1Id: image1,
          image2Id: image2,
          image3Id: image3
        })
        alert('Carrossel criado com sucesso!')
        router.replace('/adm/carousels')
      }
    } catch(err) {
      alert('Erro ao criar carrossel')
    }
    setLoading(false)
  }

  return (
    <SidebarDrawerProvider>
      <ChakraProvider>
        {loading && (
          <Flex
            align='center'
            justify='center'
            position='absolute'
            top={0}
            right={0}
            bottom={0}
            left={0}
            bg="rgba(0, 0, 0, 0.5)"
          >
            <Spinner
              thickness="5px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        )}

        <div className={styles.container}>
          <Header user={user} />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

                <Flex
                  p={["6", "8"]}
                  bg="gray.200"
                  borderRadius={8}
                  pb="4"
                  w="100%"
                  flexDir="column"
                  justify="space-between"
                  minH="lg"
                >
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    mb="10"
                  >
                    Criar um carrossel
                  </Text>


                  <form className={styles.form} onSubmit={handleCreate}>
                    <FormControl id="image1">
                      <FormLabel fontSize="lg" fontWeight="bold" mt="5">Selecione a imagem 1</FormLabel>
                      <SimpleGrid
                        flex="1"
                        gap="4"
                        minChildWidth="320px"
                        align="flex-start"
                      >
                        {images.map((image) => {
                          return (
                            <button
                              key={image.id}
                              type="button"
                              onClick={() => setImage1(image.id)}
                            >
                              <Image
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                src={`${process.env.URL}/uploads/${image.path}`}
                                alt={image.name}
                                border={image1 === image.id ? '3px solid #6f24b4' : 'none'}
                                borderRadius={8}
                              />
                            </button>
                          )
                        })}
                      </SimpleGrid>
                    </FormControl>

                    <FormControl mt="10" id="image2">
                      <FormLabel fontSize="lg" fontWeight="bold">Selecione a imagem 2</FormLabel>
                      <SimpleGrid
                        flex="1"
                        gap="4"
                        minChildWidth="320px"
                        align="flex-start"
                      >
                        {images.map((image) => {
                          return (
                            <button
                              key={image.id}
                              type="button"
                              onClick={() => setImage2(image.id)}
                            >
                              <Image
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                src={`${process.env.URL}/uploads/${image.path}`}
                                alt={image.name}
                                border={image2 === image.id ? '3px solid #6f24b4' : 'none'}
                                borderRadius={8}
                              />
                            </button>
                          )
                        })}
                      </SimpleGrid>
                    </FormControl>

                    <FormControl mt="10" id="image3">
                    <FormLabel fontSize="lg" fontWeight="bold">Selecione a imagem 3</FormLabel>
                    <SimpleGrid
                        flex="1"
                        gap="4"
                        minChildWidth="320px"
                        align="flex-start"
                      >
                        {images.map((image) => {
                          return (
                            <button
                              key={image.id}
                              type="button"
                              onClick={() => setImage3(image.id)}
                            >
                              <Image
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                src={`${process.env.URL}/uploads/${image.path}`}
                                alt={image.name}
                                border={image3 === image.id ? '3px solid #6f24b4' : 'none'}
                                borderRadius={8}
                              />
                            </button>
                          )
                        })}
                      </SimpleGrid>
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      type="submit"
                      mt="10"
                    >
                      Criar
                    </Button>
                  </form>
                </Flex>
          </Flex>
        </div>
      </ChakraProvider>
    </SidebarDrawerProvider>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);
  const user = JSON.parse(cookies['carousel.user'])
  const { data } = await api.get('uploads')

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      user,
      images: data
    }
  }
})
