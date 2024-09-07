import { ActionFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { deleteBooks, getBooks } from "../services/BooksServices"
import { deleteLoans, getLoans } from "../services/LoansServices"
import { deleteUser, getUsers } from "../services/UsersServices"
import { BookType } from "../types/BookTypes"
import { LoanType } from "../types/LoanTypes"
import { UserType } from "../types/UserTypes"
import DetailsBook from "../components/DetailsBook"
import DetailsUser from "../components/DetailsUser"
import DetailsLoan from "../components/DetailsLoan"
import nuevo from '../img/new.png'
import { toast } from "react-toastify"


export const action = async ({request} : ActionFunctionArgs) => {

    const data = Object.fromEntries( await request.formData() )
    // console.log(data);
    // console.log(Object.keys(data)[0]);

    switch (Object.keys(data)[0]) {
        case 'libroID':
            // console.log('book');
            await deleteBooks(+data.libroID)
            toast.error('Libro Eliminado Correctamente')
            return redirect('/administrador')
        
        case 'usuarioID':
            // console.log('user');
            try {
                await deleteUser(+data.usuarioID)
                toast.error('Usuario Eliminado Correctamente')
                return redirect('/administrador')
              } catch (error: unknown) {    
                if (error instanceof Error) {
                  return { error: error.message };
                }
                return { error: "An unknown error occurred" };
              }
        
        case 'prestamoID':
            // console.log('user');
            await deleteLoans(+data.prestamoID)
            toast.error('Prestamo Eliminado Correctamente')
            return redirect('/administrador')

        default:
            break;
    }
}

export const loader = async () => {
    const books = await getBooks()
    const users = await getUsers()
    const loans = await getLoans()

    return {books, users, loans}
}

type LoaderBooksUsersLoans = {
    books: BookType[]
    users: UserType[]
    loans: LoanType[]
}

const AdminPage = () => {

    const {books, users, loans} = useLoaderData() as LoaderBooksUsersLoans
    const navigate = useNavigate()
    confirm

    

  return (
    <div className="lg:w-2/3 max-w-[90%] mx-auto">
        <h2 className=" heading2 text-2xl lg:text-4xl font-black inline-block">Administra tus</h2>
        <p className=" font-bold ml-3 text-xl">Libros, Usuarios y Prestamos</p>

        {/* PRESTAMOS */}
        <section className=" mt-7">
            <div className=" flex gap-5 items-center justify-between">
                <h3 className=" uppercase text-gray-700 font-bold text-2xl">Prestamos:</h3>
            </div>
            
            <div className="overflow-y-auto max-h-[20rem]">
                <table className="w-full mt-3 table-auto">
                    <thead className="bg-slate-800 text-white hidden md:table-header-group">
                        <tr>
                            <th className="p-2">Usuario</th>
                            <th className="p-2">Libros</th>
                            <th className="p-2">Fecha/Hora Prestamo</th>
                            <th className="p-2">Fecha/Hora Retorno</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
        
                    <tbody>
                        {loans.map(prestamo => (
                            <DetailsLoan 
                                key={prestamo.id}
                                prestamo={prestamo}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        {/* LIBROS */}
        <section className=" mt-7 border-t-4 border-gray-400 py-5">
            <div className="lg:w-2/3">
                <div className=" flex gap-5 items-center justify-between">
                    <h3 className=" uppercase text-gray-700 font-bold text-2xl">Libros:</h3>
                    <button
                        className="py-2 px-4 border-none rounded-md hover:bg-indigo-200 transition-all font-bold uppercase text-indigo-700 flex gap-2 items-center justify-center text-center"
                        type="button"
                        onClick={() => navigate('/administrador/libros/nuevo')}
                    >
                        <img className="w-8" src={nuevo} alt="icono nuevo" />
                        Nuevo Libro
                    </button>
                </div>
                
                <div className="overflow-y-auto max-h-[20rem]">
                    <table className="w-full mt-3 table-auto">
                        <thead className="bg-slate-800 text-white hidden md:table-header-group">
                            <tr>
                                <th className="p-2">Título</th>
                                <th className="p-2">Autor</th>
                                <th className="p-2">Fecha Publicación</th>
                                <th className="p-2">Cantidad</th>
                                <th className="p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <DetailsBook 
                                    key={book.id}
                                    book={book}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* USUARIOS */}
        <section className="mt-7 border-t-4 border-gray-400 py-5">
            <div className="lg:w-2/3">
                <div className=" flex gap-5 items-center justify-between">
                    <h3 className=" uppercase text-gray-700 font-bold text-2xl">Usuarios:</h3>
                    <button
                        className="py-2 px-4 border-none rounded-md hover:bg-indigo-200 transition-all font-bold uppercase text-indigo-700 flex gap-2 items-center justify-center text-center"
                        type="button"
                        onClick={() => navigate('/administrador/usuarios/nuevo')}
                    >
                        <img className="w-8" src={nuevo} alt="icono nuevo" />
                        Nuevo Usuario
                    </button>
                </div>
                
                <div className="overflow-y-auto max-h-[20rem]">
                    <table className="w-full mt-3 table-auto">
                        <thead className="bg-slate-800 text-white hidden md:table-header-group">
                            <tr>
                                <th className="p-2">Nombre Completo</th>
                                <th className="p-2">Curso</th>
                                <th className="p-2">Rol</th>
                                <th className="p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <DetailsUser 
                                    key={user.id}
                                    user={user}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    </div>
  )
}

export default AdminPage