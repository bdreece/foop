import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/index.scss';
import Index from './pages/Index';

const client = new ApolloClient({
  uri: 'http://localhost:8080/api/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([{ path: '/', element: <Index /> }]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
