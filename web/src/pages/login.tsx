import styles from '../styles/pages/login.module.scss'

import Image from 'next/image'
import React, { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/auth'
import { ChakraProvider, Spinner } from '@chakra-ui/react'
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()
    if (!loading) {
      try {
        setLoading(true)
        await signIn({ email, password })
      } catch(err) {
        alert('Erro ao entrar, verifique os dados e tente novamente')
      }
      setLoading(false)
    }
  }

  return (
    <ChakraProvider>
      <div className={styles.container}>

      <Image
        width={100}
        height={100}
        src="/logo.png"
        alt="Logo imagem"
      />

      <form onSubmit={handleSignIn}>
        <fieldset>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </fieldset>

        {loading ? (
          <div className={styles.disabled}>
            <Spinner color="white" />
          </div>
        ) : (
          <button type="submit">Entrar</button>
        )}
      </form>

      </div>
    </ChakraProvider>
  );
}


export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
