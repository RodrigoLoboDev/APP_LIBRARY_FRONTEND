import linkedin from '../img/linkedin.png'
import github from '../img/github.png'
import facebook from '../img/facebook.svg'


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto w-[90%] flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className=' uppercase font-bold'>&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
          <p>Desarrollado por <span className=" font-bold">[Lobo, Jesús Luis Rodrigo]</span></p>
          <p>Contacto: <a href="mailto:rolobo2812@gmail.com" className="text-blue-400">rolobo2812@gmail.com</a></p>
        </div>
        <div className="mt-4 md:mt-0 space-y-3">
          <p>Sígueme en:</p>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="text-blue-400 flex gap-2">
              <img
                className=' w-7' 
                src={linkedin} 
                alt="logo linkedin" 
              />
              LinkedIn
            </a>
            <a href="https://github.com/RodrigoLoboDev" target="_blank" rel="noopener noreferrer" className="text-gray-400 flex gap-2">
              <img
                className=' w-7' 
                src={github} 
                alt="logo github" 
              />
              GitHub
            </a>
            <a href="https://www.facebook.com/luis.r.lobo" target="_blank" rel="noopener noreferrer" className="text-blue-300 flex gap-2">
              <img
                className=' w-7' 
                src={facebook} 
                alt="logo facebook" 
              />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
