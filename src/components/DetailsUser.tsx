import { useFetcher, useNavigate } from "react-router-dom"
import { FormEvent, useEffect } from "react"
import { UserType } from "../types/UserTypes"
import edit from '../img/edit.png';
import eliminar from '../img/delete.png'
import { toast } from "react-toastify";

type DetailsUserProps = {
    user: UserType
}

const DetailsUser = ({user} : DetailsUserProps) => {

    const navigate = useNavigate()

    const fetcher = useFetcher()

    useEffect(() => {
        if (fetcher.data?.error) {
            // Maneja el error aquí, por ejemplo, mostrando una alerta
            toast.error(fetcher.data.error)
            // alert(fetcher.data.error);
        }
    }, [fetcher.data]);

    const handleClick = (e : FormEvent) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            e.preventDefault();
        }
    }

  return (
    <tr className="border-b-2 border-gray-300 flex flex-col md:table-row ">
        <td className="p-3 text-base text-gray-800 uppercase font-bold">
            <span className=" md:hidden block font-black text-gray-600 uppercase">Nombre Completo:</span>
            {user.lastName + ' ' + user.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <p>
                <span className=" md:hidden font-black text-gray-600 uppercase">Curso: </span>
                {user.course}
            </p>
        </td>
        <td className="p-3 text-lg text-gray-800">
            <p>
                <span className=" md:hidden font-black text-gray-600 uppercase">Rol: </span>
                {user.role}
            </p>
        </td>
        <td className="p-3">
            <div className=" flex flex-col md:flex-row gap-2 items-center">
                <button
                    onClick={() => navigate(`/administrador/usuarios/${user.id}/editar`)}
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
                        name="usuarioID"
                        value={user.id.toString()}
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

export default DetailsUser