import { ActionFunctionArgs, Form, redirect, useActionData, useNavigate } from "react-router-dom"
import Error from "../components/Error"
import { createBook } from "../services/BooksServices";
import { toast } from "react-toastify";

export const action = async ({request} : ActionFunctionArgs) => {
  const data = Object.fromEntries( await request.formData() )
  let error = '';
  if (Object.values(data).includes('')) {
      error = 'Todos los campos son Obligatorios'
      return error
  } else {
      await createBook(data)
      toast.success('Libro Creado Correctamente!')
      return redirect('/administrador')
  }
}

const NewBook = () => {

  const navigate = useNavigate()
  const error = useActionData() as string

  return (
    <div className=" max-w-[90%] mx-auto md:w-2/3 lg:w-1/2">
      <div className=" flex md:flex-row flex-col justify-between items-center space-y-2">
        <div className=" md:w-4/5">
          <h2 className=" heading2 text-2xl lg:text-4xl font-black inline-block">Crea un nuevo libro</h2>
          <p>Llena el Formulario y Registra un nuevo Libro</p>
        </div>
        <button
          type="button"
          className="bg-indigo-600 py-2 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors w-full md:w-1/5 rounded-md"
          onClick={() => navigate(-1)}
        >Volver</button>
      </div>

      <Form 
        className="bg-white shadow-md rounded-lg py-10 px-5 my-5"
        noValidate
        method="POST"
      >
        {error != undefined && <Error>{error}</Error>}
        
        <div className="mb-5 space-y-3">
            <label htmlFor="title" className="text-sm uppercase font-bold">
                Título 
            </label>

            <input 
              className="mt-2 block w-full p-3 bg-gray-50"
              name="title"
              type="text"
              placeholder="Ingresa un Título"
            />
        </div>

        <div className="mb-5 space-y-3">
            <label htmlFor="author" className="text-sm uppercase font-bold">
                Autor 
            </label>

            <input 
              className="mt-2 block w-full p-3 bg-gray-50"
              name="author"
              type="text"
              placeholder="Ingresa un Autor"
            />
        </div>

        <div className="mb-5 space-y-3">
            <label htmlFor="publicationDate" className="text-sm uppercase font-bold">
                Fecha de Publicación 
            </label>

            <input 
              className="mt-2 block w-full p-3 bg-gray-50"
              name="publicationDate"
              type="date"
            />
        </div>

        <div className="mb-5 space-y-3">
            <label htmlFor="quantity" className="text-sm uppercase font-bold">
                Cantidad 
            </label>

            <input 
              className="mt-2 block w-full p-3 bg-gray-50"
              name="quantity"
              type="number"
              defaultValue={1}
              min={1}
            />
        </div>

        <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value='Guardar Libro'
        />
      </Form> 
    </div>
  )
}

export default NewBook