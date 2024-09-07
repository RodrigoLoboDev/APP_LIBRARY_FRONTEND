import imagenIndex from '../img/index.png'


const IndexPage = () => {
  return (
    <div className=" md:w-2/3 lg:w-1/2">
      <div className=' flex items-center gap-10 flex-col md:flex-row'>
        <h1 className=" text-center md:text-left md:w-1/2 text-[3rem] lg:text-6xl font-black leading-10 lg:leading-[3.5rem]">Administra tu <span className=" heading">Biblioteca</span> Escolar</h1>

        <div className="container mx-auto">
          <img 
            src={imagenIndex} 
            alt="Descripción de la imagen" 
            className="w-full h-auto object-cover"
          />
        </div>

      </div>
    </div>
  )
}

export default IndexPage