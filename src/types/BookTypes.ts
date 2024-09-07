import { z } from 'zod'

// los tipos de datos que envia el formulario via action
export type Data = {
    [k: string]: FormDataEntryValue;
}

// los tipos de datos para validar lo que enviar el usuario por el formulario
export const DraftBookSchema = z.object({
    title: z.string(),
    author: z.string(),
    publicationDate: z.string(),
    quantity: z.number()
})

// los tipos de datos para validar cuando los traemos de la DB
export const BookSchema = z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    publicationDate: z.string(),
    quantity: z.number()
})

// construimos un arreglo porque es un arreglo lo que viene de la DB
export const BooksSchema = z.array(BookSchema)

// este seria el type para inferir en las consultas por el ID por ejemplo
export type BookType = z.infer<typeof BookSchema>
export type DraftBookType = z.infer<typeof DraftBookSchema>