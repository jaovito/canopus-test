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

export default function CreateUser({ user }) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    try {
      setLoading(true)
      await api.post('users', {
        name,
        email,
        password
      })
      alert('Usuário criado com sucesso!')
      router.replace('/adm/users')
    } catch(err) {
      alert('Erro ao criar usuário')
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
                    Criar um usuário
                  </Text>


                  <form className={styles.form} onSubmit={handleCreate}>
                    <FormControl id="name">
                      <FormLabel>Nome</FormLabel>
                      <Input
                        type="text"
                        bg="gray.300"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    </FormControl>

                    <FormControl id="email">
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        type="email"
                        bg="gray.300"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                      <FormHelperText>O e-mail deve ser único</FormHelperText>
                    </FormControl>

                    <FormControl id="password">
                      <FormLabel>Senha</FormLabel>
                      <Input
                        type="password"
                        bg="gray.300"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      type="submit"
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

  return {
    props: {
      user,
    }
  }
})
