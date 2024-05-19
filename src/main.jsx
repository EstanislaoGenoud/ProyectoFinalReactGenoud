import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/Layout/App'
import './index.css'
import { CartProvider } from './CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)
