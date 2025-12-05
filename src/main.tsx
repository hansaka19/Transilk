import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Stones from './components/Products/Stones'
import MinecartPage from './pages/Minecart'
import Jewelleries from './components/Products/Jewelleries'
import Collections from './components/Products/Collections'
import ProductDetail from './pages/ProductDetail'
import { CartProvider } from './context/CartContext'
import Support from './pages/Support'
import Checkout from './pages/Checkout'
import PayNow from './pages/PayNow'
import Journey from './pages/Journey'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <CartProvider>
        <App />
      </CartProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'stones', element: <Stones /> },
      { path: 'stones/:id', element: <ProductDetail /> },
      { path: 'minecart', element: <MinecartPage /> },
      { path: 'jewelleries', element: <Jewelleries /> },
      { path: 'jewelleries/:id', element: <ProductDetail /> },
      { path: 'collections', element: <Collections /> },
      { path: 'support', element: <Support /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'paynow', element: <PayNow /> },
      { path: 'journey', element: <Journey /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
