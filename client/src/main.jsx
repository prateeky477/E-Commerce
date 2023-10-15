import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ProductProvider from './context/ProductContext'
import CartProvider from './context/CartContext'
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from './context/LoggedIn'
// import  UserProvider  from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ProductProvider>
      <AuthProvider>
      {/* <UserProvider> */}
        <React.StrictMode>
          <App />
        </React.StrictMode>
        {/* </UserProvider> */}
      </AuthProvider>
    </ProductProvider>
  </ChakraProvider>,
)
