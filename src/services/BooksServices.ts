import axios from 'axios'
import { BookSchema, BooksSchema, BookType, Data, DraftBookSchema } from '../types/BookTypes';

export async function createBook (datos : Data) {
    const newData = {
        title: datos.title,
        author: datos.author,
        publicationDate: datos.publicationDate,
        quantity: +datos.quantity
      }
    try {
        // Validamos que los datos que enviamos tiene el schema que definimos
        const result = DraftBookSchema.safeParse(newData)
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/books`
            await axios.post(url, result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getBooks() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/books`
        const { data } = await axios(url)        
        
        // Validamos que los datos que recibimos son los que esperamos, filtramos tambien los datos necesarios unicamente
        const result = BooksSchema.safeParse(data)
        
        if (result.success) {
            return result.data
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function getBookById(id : BookType['id']) {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/books/${id}`
        const { data } = await axios(url)           
        
        // Validamos que los datos que recibimos son los que esperamos, filtramos tambien los datos necesarios unicamente
        const result = BookSchema.safeParse(data)
        
        if (result.success) {
            return result.data
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function updateBooks (datos : Data, id : BookType['id']) {
    // console.log(datos);    
    // console.log(Boolean(+datos.availability));
    
    try {
        // Validamos que los datos que enviamos tiene el schema que definimos
        const result = BookSchema.safeParse({
            id: id,
            ...datos,
            quantity: +datos.quantity
        })
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/books/${id}`
            // console.log(result.data);
            await axios.put(url, result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

export async function deleteBooks(id: BookType['id']) {    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/books/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error);
    }
}