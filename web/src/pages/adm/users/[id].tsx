import styles from '../../../styles/pages/adm.module.scss'
import { api } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth"
import { SidebarDrawerProvider } from '../../../contexts/SidebarDrawerContext'
import {
  ChakraProvider,
  Flex,
  Text,
  Spinner,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Switch,
} from '@chakra-ui/react'

import { useRouter } from 'next/router'

import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import React, { useState } from "react";
import { parseCookies } from "nookies";

export default function UserID({ userData, user }) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(userData.user.name)
  const [admin, setAdmin] = useState(false)

  const router = useRouter()
  const { id } = router.query

  async function handleDelete() {
    try {
      setLoading(true)
      await api.delete(`users/${id}`)
      router.replace('/adm/users')
    } catch(err) {
      alert('Erro ao deletar usuário')
    }
    setLoading(false)
  }

  async function handleUpdate() {
    try {
      setLoading(true)
      await api.put(`users/${id}`, {
        name
      })

      if (admin) {
        await api.post('adm', {
          userId: id
        })
      }

      router.replace('/adm/users')
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

            <Box
              p={["6", "8"]}
              bg="gray.100"
              borderRadius={8}
              pb="4"
              w="100%"
            >

              <Text fontSize="lg" mb="4">Dados do Usuário</Text>

              <Flex
                align="flex-start"
                justifyContent="space-between"
                gap="2"
                mt="10"
                flexDir="column"
                h="70%"
              >
                <FormControl mb="10" id="name">
                  <FormLabel>Nome</FormLabel>
                  <Input
                    bg="gray.300"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <FormHelperText>E-mail é um dado único, então não pode-se altera-lo.</FormHelperText>
                </FormControl>

                <FormControl mb="5" display="flex" alignItems="center">
                  <FormLabel htmlFor="admin" mb="0">
                    É administrador?
                  </FormLabel>
                  <Switch id="admin" isChecked={admin} onChange={() => setAdmin(oldValue => !oldValue)} />
                </FormControl>

                <Flex
                  align="center"
                  justify="space-between"
                  w="100%"
                >
                  <Button
                    colorScheme="blue"
                    onClick={handleUpdate}
                  >
                    Salvar
                  </Button>

                  <Button
                    colorScheme="pink"
                    onClick={handleDelete}
                  >
                    Excluir
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </div>
      </ChakraProvider>
    </SidebarDrawerProvider>
  )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { id } = ctx.params

  const cookies = parseCookies(ctx);
  const user = JSON.parse(cookies['carousel.user'])

  const { data } = await api.get(`users/${id}`)

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      userData: data,
      user
    },
  }
})
