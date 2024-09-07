import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom"
import Error from "../components/Error"
import { toast } from "react-toastify";
import { courses, users } from "../data";
import { getUserById, updateUser } from "../services/UsersServices";
import { UserType } from "../types/UserTypes";

export const action = async ({request, params} : ActionFunctionArgs) => {
  const data = Object.fromEntries( await request.formData() )
  let error = '';
  if (Object.values(data).includes('')) {
      error = 'Todos los campos son Obligatorios'
      return error
  } else {
    if (params.id !== undefined) {
      await updateUser(data, +params.id)
      toast.success('Usuario Modificado Correctamente!')
      return redirect('/administrador')
    }
  }
}

export const loader = async ({params} : LoaderFunctionArgs) => {       

  if (params.id !== undefined) {
      const user = await getUserById(+params.id)    
      
      if (!user) {
          // Si el id del producto no existe podemos enviar este error que no es muy vistoso
          // throw new Response('', {status: 404, statusText: 'Producto No Encontrado'})
          // O redireccionar al usuario a la pagina principal 
          return redirect('/')
      }
      return user
  }
}


const EditUser = () => {

  const navigate = useNavigate()
  const error = useActionData() as string

  const data = useLoaderData() as UserType
  

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
            <label htmlFor="name" className="text-sm uppercase font-bold">
                Nombre 
            </label>

            <input 
              className="mt-2 block w-full p-3 bg-gray-50"
              name="name"
              type="text"
              defaultValue={data.name}
              placeholder="Ingresa un Nombre"
            />
        </div>

        <div className="mb-5 space-y-3">
            <label htmlFor="lastName" className="text-sm uppercase font-bold">
                Apellido 
            </label>

            <input 
              className="mt-2 block w-full p-3 bg-gray-50"
              name="lastName"
              type="text"
              defaultValue={data.lastName}
              placeholder="Ingresa un Apellido"
            />
        </div>

        <div className="mb-5 space-y-3">
            <label htmlFor="course" className="text-sm uppercase font-bold">
                Curso 
            </label>

            <select 
                className="mt-2 block w-full p-3 bg-gray-50 text-center"
                name="course"
                defaultValue={data.course}
            >
                <option value="">--Selecciona Un Curso--</option>
                {courses.map(course => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                ))}
            </select>
        </div>

        <div className="mb-5 space-y-3">
            <label htmlFor="role" className="text-sm uppercase font-bold">
                Rol 
            </label>

            <select 
                className="mt-2 block w-full p-3 bg-gray-50 text-center"
                name="role"
                defaultValue={data.role}
            >
                <option value="">--Selecciona Un Rol--</option>
                {users.map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                ))}
            </select>
        </div>

        <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value='Modificar Usuario'
        />
      </Form> 
    </div>
  )
}

export default EditUser