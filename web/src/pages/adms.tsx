import styles from '../styles/pages/adm.module.scss'
import React, { useState } from "react";

import { FaTrash } from "react-icons/fa";
import { parseCookies } from "nookies";
import { motion } from "framer-motion";

import { api } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth"
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'

import {
  ChakraProvider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  SimpleGrid,
  Text,
  Box,
  Button
} from '@chakra-ui/react'

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import formatedDate from "../utils/formatedDate";

export default function Admins({ adms, user }) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState(adms)


  async function handleDelete(id: string) {
    try {
      setLoading(true)
      await api.delete(`adm/${id}`)
      alert('Deletado com sucesso!')
    } catch(err) {
      alert('Erro ao administrador usuário')
    }
    const response = await api.get('adm')
    setUsers(response.data)

    adms = response.data

    setLoading(false)
  }

  adms = users

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

            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              align="flex-start"
            >
              {adms.map(adm => (
                <Flex
                  p={["6", "8"]}
                  bg="gray.200"
                  borderRadius={8}
                  pb="4"
                  maxW="80"
                  maxH="64"
                  justify="space-between"
                  key={adm.id}
                >
                  <Box>
                    <Box mb="5">
                      <Text color="gray.800" fontWeight="bold">Nome:</Text>
                      <Text color="gray.600">{adm.user.name}</Text>
                    </Box>

                    <Box>
                      <Text color="gray.800" fontWeight="bold">E-mail:</Text>
                      <Text  color="gray.600">{adm.user.email}</Text>
                    </Box>

                    <Box mt="5">
                      <Text color="gray.800" fontWeight="bold">Data de criação: </Text>
                      <Text  color="gray.600">{formatedDate(adm.created_at)}</Text>
                    </Box>
                  </Box>

                  <Button
                    colorScheme="pink"
                    onClick={() => handleDelete(adm.id)}
                  >
                    Excluir
                  </Button>
                </Flex>
              ))}

            </SimpleGrid>
          </Flex>
        </div>
      </ChakraProvider>
    </SidebarDrawerProvider>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const response = await api.get('adm');
  const cookies = parseCookies(ctx);
  const user = JSON.parse(cookies['carousel.user'])

  return {
    props: {
      adms: response.data,
      user
    }
  }
})
