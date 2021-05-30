import styles from '../../../styles/pages/adm.module.scss'
import React, { useState } from "react";
import Link from 'next/link'

import { FaPen, FaTrash } from "react-icons/fa";
import { parseCookies } from "nookies";
import { motion } from "framer-motion";

import { api } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth"
import { SidebarDrawerProvider } from '../../../contexts/SidebarDrawerContext'

import {
  ChakraProvider,
  Flex,
  Spinner,
  SimpleGrid,
  Box,
  Image,
  Text,
  Button
} from '@chakra-ui/react'

import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useRouter } from 'next/router';

export default function Images({ user, images }) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleDelete(id: string) {
    try {
      setLoading(true)
      await api.delete(`uploads/${id}`)
      alert('Imagem removida com sucesso!')
      router.replace('/adms')
    } catch(err) {
      alert('Erro ao deletar usuário')
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

            <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
              {images.length !== 0 ? images.map(image => (
                <Flex
                  p={["6", "8"]}
                  bg="gray.200"
                  borderRadius={8}
                  pb="4"
                  maxW="xl"
                  flexDir="column"
                  justify="space-between"
                  key={image.id}
                >
                  <Box>
                    <Image borderRadius={8} src={`${process.env.URL}/uploads/${image.path}`} alt="Teste" />
                    <Text mt="5" fontSize="xl" fontWeight="bold">{image.name}</Text>
                  </Box>

                  <Button
                    colorScheme="pink"
                    onClick={() => handleDelete(image.id)}
                  >
                    Excluir
                  </Button>
                </Flex>
              )) : (
                <Box>
                  <Text>Nenhuma imagem disponível</Text>
                </Box>
              )}
            </SimpleGrid>
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
