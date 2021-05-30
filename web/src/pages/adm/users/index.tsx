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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  SimpleGrid,
  Box,
  Text,
  Button
} from '@chakra-ui/react'

import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import formatedDate from "../../../utils/formatedDate";

export default function Users({ allUsers, user }) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState(allUsers)

  async function handleDelete(id: string) {
    try {
      setLoading(true)
      await api.delete(`users/${id}`)
      alert('Deletado com sucesso!')
    } catch(err) {
      alert('Erro ao deletar usuário')
    }
    const response = await api.get('users')

    setUsers(response.data.user)

    allUsers = await response.data.user
    setLoading(false)
  }

  allUsers = users


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
              {allUsers.length !== 0 ? allUsers.map(allUser => (
                <Flex
                  p={["6", "8"]}
                  bg="gray.200"
                  borderRadius={8}
                  pb="4"
                  maxW="80"
                  maxH="72"
                  justify="space-between"
                  key={allUser.id}
                >
                  <Box>
                    <Box mb="5">
                      <Text color="gray.800" fontWeight="bold">Nome:</Text>
                      <Text color="gray.600">{allUser.name}</Text>
                    </Box>

                    <Box>
                      <Text color="gray.800" fontWeight="bold">E-mail:</Text>
                      <Text  color="gray.600">{allUser.email}</Text>
                    </Box>

                    <Box mt="5">
                      <Text color="gray.800" fontWeight="bold">Data de criação: </Text>
                      <Text  color="gray.600">{formatedDate(allUser.created_at)}</Text>
                    </Box>
                  </Box>

                  <Link href={`/adm/users/${allUser.id}`}>
                    <Button
                      colorScheme="orange"
                      mr="2"
                    >
                      Editar
                    </Button>
                  </Link>

                  <Button
                    colorScheme="pink"
                    onClick={() => handleDelete(allUser.id)}
                  >
                    Excluir
                  </Button>
                </Flex>
              )) : <Text>Nenhum usuário cadastrado</Text>}
            </SimpleGrid>
          </Flex>
        </div>
      </ChakraProvider>
    </SidebarDrawerProvider>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const response = await api.get('users');
  const cookies = parseCookies(ctx);
  const user = JSON.parse(cookies['carousel.user'])

  return {
    props: {
      allUsers: response.data.user,
      user
    }
  }
})
