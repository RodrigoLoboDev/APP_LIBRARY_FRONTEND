import { createBrowserRouter } from 'react-router-dom'
import LayoutLibrary from './Layouts/LayoutLibrary'
import IndexPage from './views/IndexPage'
import NewBook from './views/NewBook'
import NewLoan from './views/NewLoan'
import LoanPage from './views/LoanPage'
import { loader as loaderNewLoan } from './views/NewLoan'
import { action as actionNewLoan } from './views/NewLoan'
import { loader as loaderLoanPage } from './views/LoanPage'
import { action as updateIsActive } from './views/LoanPage'
import { loader as loaderAdmin } from './views/AdminPage'
import { action as actionAdmin } from './views/AdminPage'
import { action as actionNewBook } from './views/NewBook'
import { action as actionNewUser } from './views/NewUser'
import { loader as loaderEditBook } from './views/EditBook'
import { action as actionEditBook } from './views/EditBook'
import { loader as loaderEditUser } from './views/EditUser'
import { action as actionEditUser } from './views/EditUser'
import AdminPage from './views/AdminPage'
import NewUser from './views/NewUser'
import EditBook from './views/EditBook'
import EditUser from './views/EditUser'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutLibrary />,
        children: [
            {
                index: true,
                element: <IndexPage />
            },
            {
                path: 'prestamos',
                element: <LoanPage />,
                loader: loaderLoanPage,
                action: updateIsActive
            },
            {
                path: 'prestamos/nuevo',
                element: <NewLoan />,
                loader: loaderNewLoan,
                action: actionNewLoan
            },
            {
                path: 'administrador',
                element: <AdminPage />,
                loader: loaderAdmin,
                action: actionAdmin
            },
            {
                path: 'administrador/libros/nuevo',
                element: <NewBook />,
                action: actionNewBook
            },
            {
                path: 'administrador/libros/:id/editar',
                element: <EditBook />,
                action: actionEditBook,
                loader: loaderEditBook
            },
            {
                path: 'administrador/usuarios/nuevo',
                element: <NewUser />,
                action: actionNewUser
            },
            {
                path: 'administrador/usuarios/:id/editar',
                element: <EditUser />,
                action: actionEditUser,
                loader: loaderEditUser
            }
            
        ]
    }
    // Puedo tener mas de un Layout, aqui iria el segundo Layout con la misma sintaxis de arriba
])