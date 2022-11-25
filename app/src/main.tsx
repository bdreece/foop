import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { AccessProvider, ProfileProvider } from './components/providers';
import Index from './pages/Index';
import About from './pages/About';
import './styles/index.scss';

const client = new ApolloClient({
  uri: 'http://localhost:8080/api/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  { path: '/', element: <Index /> },
  { path: '/about', element: <About /> },
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
