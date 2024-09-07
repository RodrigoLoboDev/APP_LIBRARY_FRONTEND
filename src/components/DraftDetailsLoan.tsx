import { useFetcher } from "react-router-dom"
import { LoanType } from "../types/LoanTypes"
import { useEffect } from "react"
import { toast } from "react-toastify"


type DraftDetailsLoanType = {
    prestamo: LoanType
}

const DraftDetailsLoan = ({prestamo} : DraftDetailsLoanType) => {

    const fetcher = useFetcher()    

    useEffect(() => {
        if (fetcher.data?.error) {
            // Maneja el error aquí, por ejemplo, mostrando una alerta
            toast.error(fetcher.data.error)
            // alert(fetcher.data.error);
        }
    }, [fetcher.data]);

  return (
    <tr className="border-b flex flex-col md:table-row ">
        <td className="p-3 text-base text-gray-800 uppercase font-bold">
            {prestamo.user.lastName + ' ' + prestamo.user.name}
        </td>
        <td className="p-3 text-base md:text-base text-gray-800 font-black md:font-normal">
            <ol>
                {prestamo.books.map(book => (
                    <li key={book.title}>{book.title}</li>
                ))}
            </ol>
        </td>
        <td className="p-3 text-base text-gray-800">
            <p><span className=" uppercase text-gray-600 font-bold">Fecha:</span> {prestamo.loanDate}</p>
            <p><span className=" uppercase text-gray-600 font-bold">Hora:</span> {prestamo.loanTime}</p>
        </td>
        <td className="p-3 text-base text-gray-800">
            <p><span className=" uppercase text-gray-600 font-bold">Fecha:</span> {prestamo.returnDate}</p>
            <p><span className=" uppercase text-gray-600 font-bold">Hora:</span> {prestamo.returnTime}</p>
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form
                 method="POST"
            >
                <button
                    type="submit"
                    name="id"
                    value={prestamo.id.toString()}
                    className={`${prestamo.isActive ? " text-lime-500 border-lime-700" : "text-red-700 border-red-700"} border w-full p-2 font-bold text-sm cursor-pointer rounded`}
                >
                    {prestamo.isActive ? "Activo" : "Devuelto"}
                </button>
            </fetcher.Form>
        </td>
    </tr> 
  )
}

export default DraftDetailsLoan