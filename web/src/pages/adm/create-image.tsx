import styles from '../../styles/pages/adm.module.scss'
import React, { ChangeEvent, FormEvent, useState } from "react";

import { parseCookies } from "nookies";

import { api } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth"
import { SidebarDrawerProvider } from '../../contexts/SidebarDrawerContext'

import {
  ChakraProvider,
  Flex,
  Spinner,
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

import { FiPlus } from 'react-icons/fi'

export default function CreateImages({ user }) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ images, setImages ] = useState<File[]>([])
  const [ previewImages, setPreviewImages ] = useState<string[]>([])

  const router = useRouter()

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const selectedImages = Array.from(e.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()

      data.append('name', name)
      data.append('description', description)

      images.forEach(image => {
        data.append('image', image)
      })

      await api.post('uploads', data)
      alert('Cadastro realizado com sucesso')
      router.replace('/adm/images')
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
            w="100%"
            h="120vh"
            top={0}
            right={0}
            bottom={0}
            left={0}
            bg="rgba(0, 0, 0, 0.2)"
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
                >
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    mb="10"
                  >
                    Criar um imagem
                  </Text>


                  <form onSubmit={handleCreate}>
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

                    <FormControl mt="5" id="email">
                      <FormLabel>Descrição</FormLabel>
                      <Input
                        type="email"
                        bg="gray.300"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                      />
                      <FormHelperText>O e-mail deve ser único</FormHelperText>
                    </FormControl>

                    <Box mt="10" className="input-block">
                      <FormLabel htmlFor="images">Fotos</FormLabel>

                      <div className="images-container">
                        {previewImages.map(image => {
                          return (
                            <Image w='sm' key={image} src={image} alt={name}/>
                          )
                        })}

                        <FormLabel
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          bg="gray.500"
                          htmlFor='image[]'
                          className="new-image"
                          p="2"
                          cursor="pointer"
                          w={50}
                          mt="5"
                          borderRadius={8}
                        >
                          <FiPlus size={30} color="#15b6d6" />
                        </FormLabel>

                      </div>

                      <Input
                        visible='hidden'
                        display="none"
                        type="file"
                        id='image[]'
                        onChange={handleSelectImages}
                        required
                      />
                    </Box>
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
