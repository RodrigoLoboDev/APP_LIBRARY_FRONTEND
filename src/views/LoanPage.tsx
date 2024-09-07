import { ActionFunctionArgs, useLoaderData, useNavigate } from "react-router-dom"
import { getLoans, updateIsActive } from "../services/LoansServices"
import { LoanType } from "../types/LoanTypes"
import DraftDetailsLoan from "../components/DraftDetailsLoan"
import { toast } from "react-toastify"

export const loader = async () => {
  const prestamos = await getLoans()
  
  return prestamos
}

export const action = async ({request} : ActionFunctionArgs) => {
  // console.log('desde request');
  const data = Object.fromEntries( await request.formData() )  

  try {
    await updateIsActive(+data.id)
    toast.success('Prestamo Devuelto')
    return null
  } catch (error: unknown) {    
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}

const LoanPage = () => {

    const navigate = useNavigate()
    const prestamos = useLoaderData() as LoanType[]   

  return (
    <div className=" lg:w-2/3 max-w-[90%]">
        <div className=" flex gap-5 flex-col md:flex-row items-center justify-between">
            <h2 className=" heading2 text-2xl lg:text-4xl font-black inline-block">Listado de Prestamos</h2>
            <button
                className="text-white font-bold uppercase text-center bg-indigo-500 rounded-md py-2 px-4 hover:bg-indigo-800 transition-all"
                type="button"
                onClick={() => navigate('/prestamos/nuevo')}
            >Nuevo Prestamo</button>
        </div>

        <div className="p-2">
          <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white hidden md:table-header-group">
                <tr>
                    <th className="p-2">Usuario</th>
                    <th className="p-2">Libros</th>
                    <th className="p-2">Fecha/Hora Prestamo</th>
                    <th className="p-2">Fecha/Hora Retorno</th>
                    <th className="p-2">Estado</th>
                </tr>
            </thead>
            <tbody>
              {prestamos.map(prestamo => (
                <DraftDetailsLoan 
                  key={prestamo.id}
                  prestamo={prestamo}
                />
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default LoanPage