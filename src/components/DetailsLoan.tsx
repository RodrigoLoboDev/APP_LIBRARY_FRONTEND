import { useFetcher } from "react-router-dom"
import { LoanType } from "../types/LoanTypes"
import eliminar from '../img/delete.png'
import { FormEvent } from "react";
import { toast } from "react-toastify";


type DetailsLoanType = {
    prestamo: LoanType
}

const DetailsLoan = ({prestamo} : DetailsLoanType) => {

    const fetcher = useFetcher()

    const handleClick = (e : FormEvent) => {
        const pass = '123'
        const isConfirm = confirm("¿Estás seguro de que quieres eliminar este prestamo?")
        if (!isConfirm) {
            e.preventDefault();
        } else {
            const isPass = prompt('Ingresa el Password')
            if (isPass !== pass) {
                toast.error('Password Incorrecto')
                e.preventDefault();
            }
        }
    }

  return (
    <tr className="border-b-2 border-gray-300 flex flex-col md:table-row ">
        <td className="p-3 text-base text-gray-800 uppercase font-bold">
            <span className=" md:hidden block font-black text-gray-600">Nombre Completo:</span>{prestamo.user.lastName + ' ' + prestamo.user.name}
        </td>
        <td className="p-3 text-base md:text-base text-gray-800 font-black md:font-normal">
            <span className=" md:hidden block font-black text-gray-600 uppercase">Libros:</span>
            <ol>
                {prestamo.books.map(book => (
                    <li key={book.title}>{book.title}</li>
                ))}
            </ol>
        </td>
        <td className="p-3 text-base text-gray-800">
            <span className=" md:hidden block font-black text-gray-600 uppercase">Prestamo:</span>
            <p><span className=" uppercase text-gray-600 font-bold">Fecha:</span> {prestamo.loanDate}</p>
            <p><span className=" uppercase text-gray-600 font-bold">Hora:</span> {prestamo.loanTime}</p>
        </td>
        <td className="p-3 text-base text-gray-800">
            <span className=" md:hidden block font-black text-gray-600 uppercase">Retorno:</span>
            <p><span className=" uppercase text-gray-600 font-bold">Fecha:</span> {prestamo.returnDate}</p>
            <p><span className=" uppercase text-gray-600 font-bold">Hora:</span> {prestamo.returnTime}</p>
        </td>
        
        <td className="p-3 text-lg text-gray-800 ">
            <div className=" flex gap-2 flex-col items-center">
                <fetcher.Form
                    method="POST"
                    className="w-full"
                >
                    <button
                        onClick={handleClick}
                        type="submit"
                        name="prestamoID"
                        value={prestamo.id.toString()}
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

export default DetailsLoan