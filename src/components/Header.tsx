import logo from '../img/logo.png'
import { NavLink, useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate()

  return (
    <header className=" bg-white py-2 border-b-indigo-400 border sticky top-0 z-50">
        <div className=" container mx-auto w-[90%] flex justify-between items-center flex-col lg:flex-row gap-3">
            <div className=" flex gap-3 md:gap-10 items-center flex-col md:flex-row">
                <img 
                    className=" w-20"
                    src={logo}
                    alt="Imagen logo" 
                />
                <nav className=" flex gap-5">
                    <NavLink 
                        className={(
                            {isActive}) => isActive ? 'font-bold bg-indigo-200 py-1 px-3 rounded-lg border-none' : 'font-bold hover:bg-indigo-200 py-1 px-3 rounded-lg border-none transition-all'} 
                        to={'/'} 
                    >Inicio</NavLink>
                    <NavLink 
                        className={(
                            {isActive}) => isActive ? 'font-bold bg-indigo-200 py-1 px-3 rounded-lg border-none' : 'font-bold hover:bg-indigo-200 py-1 px-3 rounded-lg border-none transition-all'} 
                        to={'/prestamos'} 
                    >Prestamo</NavLink>
                </nav>
            </div>

            <div>
                <h2 className=" font-black text-xl md:text-2xl lg:text-4xl text-center">| Escuela <span className=" text-indigo-700">Técnica N° 1 La Cocha</span> |</h2>
            </div>

            <button
                onClick={() => navigate('/administrador')}
                className=" text-white font-bold uppercase text-center bg-indigo-500 rounded-md py-2 px-4 hover:bg-indigo-800 transition-all"
                type="button"
            >Administrar</button>
        </div>
    </header>
  )
}

export default Header