import { api } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth"
import styles from '../../styles/pages/adm.module.scss'
import { SidebarDrawerProvider } from '../../contexts/SidebarDrawerContext'
import {
  ChakraProvider,
  Flex,
  Text,
  Spinner,
  SimpleGrid,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react'

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { parseCookies } from "nookies";
import { motion } from "framer-motion";
import formatedDate from "../../utils/formatedDate";
import { GetStaticPaths, GetStaticProps } from "next";

export default function AdminID({ adm, user }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete(id: string) {
    setLoading(true)
    await api.delete(`adm/${id}`)
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

              <Text fontSize="lg" mb="4">Dados do ADM</Text>

              <Flex
                align="flex-start"
                gap="2"
                mt="10"
              >
                <FormControl id="name">
                  <FormLabel>Nome</FormLabel>
                  <Input bg="gray.300" type="text" value={adm.user.name} />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
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

  const { data } = await api.get(`adm/${id}`)

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      adm: data,
      user
    },
  }
})
