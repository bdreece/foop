import type { AccessContext } from './components/providers/AccessProvider';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import {
  About,
  Auth,
  Profile,
  Dashboard,
  Landing,
  Logout,
  Search,
  Recipes,
  Overview,
} from './pages';
import Layout from './components/layout';
import { AccessProvider, ProfileProvider } from './components/providers';

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
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'about', element: <About /> },
      { path: 'auth', element: <Auth /> },
      {
        path: 'profile/',
        children: [
          { index: true, element: <Profile /> },
          { path: 'logout', element: <Logout /> },
        ],
      },
      {
        path: 'dashboard/',
        element: <Dashboard />,
        children: [
          { index: true, element: <Overview /> },
          { path: 'search', element: <Search /> },
          { path: 'recipes', element: <Recipes /> },
        ],
      },
    ],
  },
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
