import { ToastContainer } from 'react-toastify'
// La hoja de stylos css
import "react-toastify/dist/ReactToastify.css"

// Layout Principal

// Utilizamos el Outlet para insertar los componentes hijos
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LayoutLibrary() {
  return (
    <>
        <Header />
        <main className=" container mx-auto my-5 md:my-10 md:flex md:justify-center">
            <Outlet />
        </main>
        <Footer />

        <ToastContainer />
    </>
  )
}