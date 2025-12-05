import { Outlet } from 'react-router-dom'
import './index.css'
import { CartProvider } from './context/CartContext'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'

export default function Root() {
  return (
    <CartProvider>
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  )
}
