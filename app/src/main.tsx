import type { AccessContext } from './components/providers/AccessProvider';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { AccessProvider, ProfileProvider } from './components/providers';
import { Index, About, Auth, Profile } from './pages';
import './styles/index.scss';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/api/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const { accessToken }: AccessContext = JSON.parse(
    sessionStorage.getItem('AccessToken') ?? '{}',
  );
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  { path: '/', element: <Index /> },
  { path: '/about', element: <About /> },
  { path: '/auth', element: <Auth /> },
  { path: '/profile', element: <Profile /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AccessProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </AccessProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
