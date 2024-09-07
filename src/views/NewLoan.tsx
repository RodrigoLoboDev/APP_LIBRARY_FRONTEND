import Error from "../components/Error"
import { getBooks } from "../services/BooksServices"
import { ActionFunctionArgs, Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom"
import { createLoan } from "../services/LoansServices"
import { getUsers } from "../services/UsersServices"
import { BookType } from "../types/BookTypes"
import { UserType } from "../types/UserTypes"
import { useMemo, useState, ChangeEvent } from "react"
import { nowDate, nowTime } from "../helpers"
import { toast } from "react-toastify"

export const loader = async () => {
  const books = await getBooks()
  const users = await getUsers()
  
  return {books, users}
}

export const action = async ({request} : ActionFunctionArgs) => {
  // los datos estan en el formData
  const data = Object.fromEntries( await request.formData() )
  const bookIds = (data.selectedBooks as string).split(',').map(id => parseInt(id, 10));
  const newData = {
    userId: +data.userId,
    books: bookIds,
    loanDate: nowDate(),
    loanTime: nowTime(),
    returnDate: "1111-11-11",
    returnTime: "00:00:00"
  }
  let error = '';
  if (Object.values(data).includes('')) {
      error = 'Todos los campos son Obligatorios'
      return error
  } else {
      await createLoan(newData)
      toast.success('¡Prestamo Generado Correctamente!')
      return redirect('/prestamos')
  }
}

type loaderBookUser = {
  books: BookType[]
  users: UserType[]
}

const NewLoan = () => {

  const [role, setRole] = useState<string>('Alumno');
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const navigate = useNavigate()

  const error = useActionData() as string
  const {books, users} = useLoaderData() as loaderBookUser

  const filterUsers = useMemo(() => users.filter(user => user.role == role), [role])

  const handleBookChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedBooks(selected);
  };

  return (
    <div className=" max-w-[90%] mx-auto md:w-2/3 lg:w-1/2">
      <div className=" flex md:flex-row flex-col justify-between items-center space-y-2">
        <div className=" md:w-4/5">
          <h2 className=" heading2 text-2xl lg:text-4xl font-black inline-block">Crea un nuevo prestamo</h2>
          <p>Llena el Formulario y Registra un nuevo Prestamo</p>
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
                Usuario 
            </label>

            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  value="Alumno" 
                  checked={role === 'Alumno'} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="mr-2"
                />
                Alumno
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  value="Docente" 
                  checked={role === 'Docente'} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="mr-2"
                />
                Docente
              </label>
            </div>

            <select 
              className="w-full p-3  border border-gray-100"
              name="userId"
            >
              <option value="">--Selecciona un Usuario--</option>
              {filterUsers.map(user => (
                <option 
                  key={user.id}
                  value={user.id}
                >{user.lastName + ' ' + user.name}</option>
              ))}
            </select>
            
        </div>

        <div className="mb-5 space-y-3">
            <label htmlFor="name" className="text-sm uppercase font-bold">
                Libros 
            </label>

            <select 
              multiple
              className="w-full p-3 border border-gray-100"
              value={selectedBooks}
              onChange={handleBookChange}
            >
              {books.map(book => (
                <option 
                  key={book.id}
                  value={book.id}
                >
                  {book.title}
                </option>
              ))}
            </select>
            <input 
              type="hidden" 
              name="selectedBooks" 
              value={selectedBooks.join(',')} 
            />
        </div>

        <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value='Guardar Prestamo'
        />
      </Form> 
    </div>
  )
}

export default NewLoan