import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './Header'
import Footer from './Footer'
import CartProvider from '../../CartContext'
import { ToastContainer } from 'react-toastify'
import '../../App.css'

function App() {
  
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastContainer />
        <Header />
        <Main />
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
