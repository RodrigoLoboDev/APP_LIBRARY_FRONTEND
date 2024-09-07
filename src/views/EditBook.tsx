import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom"
import Error from "../components/Error"
import { getBookById, updateBooks } from "../services/BooksServices";
import { toast } from "react-toastify";
import { BookType } from "../types/BookTypes";

export const action = async ({request, params} : ActionFunctionArgs) => {
  const data = Object.fromEntries( await request.formData() )
  let error = '';
  if (Object.values(data).includes('')) {
      error = 'Todos los campos son Obligatorios'
      return error
  } else {
    if (params.id !== undefined) {
      await updateBooks(data, +params.id)
      toast.success('Libro Modificado Correctamente!')
      return redirect('/administrador')
    }
  }
}

export const loader = async ({params} : LoaderFunctionArgs) => {       

  if (params.id !== undefined) {
      const book = await getBookById(+params.id)    
      
      if (!book) {
          // Si el id del producto no existe podemos enviar este error que no es muy vistoso
          // throw new Response('', {status: 404, statusText: 'Producto No Encontrado'})
          // O redireccionar al usuario a la pagina principal 
          return redirect('/')
      }
      return book
  }
}


const EditBook = () => {

  const navigate = useNavigate()
  const error = useActionData() as string

  const data = useLoaderData() as BookType
  

  return (
    <div className=" max-w-[90%] mx-auto md:w-2/3 lg:w-1/2">
      <div className=" flex md:flex-row flex-col justify-between items-center space-y-2">
        <div className=" md:w-4/5">
          <h2 className=" heading2 text-2xl lg:text-4xl font-black inline-block">Editar un libro</h2>
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
              defaultValue={data.title}
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
              defaultValue={data.author}
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
              defaultValue={data.publicationDate}
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
              defaultValue={data.quantity}
              min={1}
            />
        </div>

        <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value='Modificar Libro'
        />
      </Form> 
    </div>
  )
}

export default EditBook