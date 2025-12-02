import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'

export default function Root() {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
