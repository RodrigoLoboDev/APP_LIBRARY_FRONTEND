import { ActionFunctionArgs, Form, redirect, useActionData, useNavigate } from "react-router-dom"
import Error from "../components/Error"
import { toast } from "react-toastify";
import { courses, users } from "../data";
import { createUser } from "../services/UsersServices";

export const action = async ({request} : ActionFunctionArgs) => {
  const data = Object.fromEntries( await request.formData() )
  let error = '';
  if (Object.values(data).includes('')) {
      error = 'Todos los campos son Obligatorios'
      return error
  } else {
      await createUser(data)
      toast.success('Usuario Creado Correctamente!')
      return redirect('/administrador')
  }
}

const NewUser = () => {

  const navigate = useNavigate()
  const error = useActionData() as string

  return (
    <div className=" max-w-[90%] mx-auto md:w-2/3 lg:w-1/2">
      <div className=" flex md:flex-row flex-col justify-between items-center space-y-2">
        <div className=" md:w-4/5">
          <h2 className=" heading2 text-2xl lg:text-4xl font-black inline-block">Crea un nuevo usuario</h2>
          <p>Llena el Formulario y Registra un nuevo Usuario</p>
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
            value='Guardar Usuario'
        />
      </Form> 
    </div>
  )
}

export default NewUser