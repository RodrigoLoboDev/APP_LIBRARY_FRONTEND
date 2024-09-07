import { useFetcher, useNavigate } from "react-router-dom"
import { BookType } from "../types/BookTypes"
import { FormEvent } from "react"
import edit from '../img/edit.png';
import eliminar from '../img/delete.png'

type DetailsBookProps = {
    book: BookType
}

const DetailsBook = ({book} : DetailsBookProps) => {

    const navigate = useNavigate()
    const fetcher = useFetcher()

    const handleClick = (e : FormEvent) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
            e.preventDefault();
        }
    }

  return (
    <tr className="border-b-2 border-gray-300 flex flex-col md:table-row ">
        <td className="p-3 text-lg text-gray-800">
            <span className=" md:hidden block font-black text-gray-600 uppercase">Título:</span>
            {book.title}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <span className=" md:hidden block font-black text-gray-600 uppercase">Autor:</span>
            {book.author}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <span className=" md:hidden block font-black text-gray-600 uppercase">Fecha de Publicación:</span>
            {book.publicationDate}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <p>
                <span className=" md:hidden font-black text-gray-600 uppercase">Cantidad: </span>
                {book.quantity}
            </p>
        </td>
        <td className="p-3">
            <div className=" flex flex-col gap-2 items-center">
                <button
                    onClick={() => navigate(`/administrador/libros/${book.id}/editar`)}
                    className=" py-2 border-none rounded-md hover:bg-amber-400 transition-all font-bold uppercase text-amber-600 w-full flex gap-2 items-center justify-center text-center"
                    type="button"
                >
                    <img className=" w-8" src={edit} alt="icono editar" />
                    Editar
                </button>
                <fetcher.Form
                    method="POST"
                    className="w-full"
                >
                    <button
                        onClick={handleClick}
                        type="submit"
                        name="libroID"
                        value={book.id.toString()}
                        className=" py-2 border-none rounded-md hover:bg-red-200 transition-all font-bold uppercase text-red-700 w-full flex gap-2 items-center justify-center text-center"
                    >
                        <img className="w-8" src={eliminar} alt="icono eliminar" />
                        Eliminar
                    </button>
                </fetcher.Form>
            </div>
        </td>
    </tr> 
  )
}

export default DetailsBook