import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../src/redux/store.js'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: 'http://localhost:5050/graphql',
  cache: new InMemoryCache()
});
const theme = createTheme({
  palette: {
    primary: {
      main: '#42B0EE',
    },
    // secondary: '#ff4081'
  }
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>

          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
