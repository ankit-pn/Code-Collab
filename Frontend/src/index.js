import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {
  ApolloClient,
  ApolloProvider,  InMemoryCache,
} from '@apollo/client'
import { StoreProvider } from './assets/StoreContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <ApolloProvider client={client}>    
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

