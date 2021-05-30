import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from '../services/api';
import Cookie from 'js-cookie'
import Routes from 'next/router'

import { addHours } from 'date-fns'

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookie.get('carousel.token');
    const user = Cookie.get('carousel.user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    Cookie.remove('carousel.token');
    Cookie.remove('carousel.user');

    setData({} as AuthState);
    Routes.push('/')
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth', {
      email,
      password,
    });

    const { token: data, user } = response.data;
    const token = data.token

    Cookie.set('carousel.token', token, { expires: addHours(new Date(), 24) });
    Cookie.set('carousel.user', JSON.stringify(user), { expires: addHours(new Date(), 24) });

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
    Routes.push('/adms')
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      Cookie.set('carousel.user', JSON.stringify(user), { expires: addHours(new Date(), 24) });

      setData({
        token: data.token,
        user,
      });
      Routes.push('/adms')
    },
    [setData, data.token],
  );


  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
