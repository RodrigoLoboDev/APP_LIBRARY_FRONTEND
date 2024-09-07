import { z } from 'zod'

// los tipos de datos que envia el formulario via action
export type Data = {
    [k: string]: FormDataEntryValue;
}

// los tipos de datos para validar lo que enviar el usuario por el formulario
export const DraftLoanSchema = z.object({
    userId: z.number(),
    books: z.array(z.number()),
    loanDate: z.string(),
    returnDate: z.string(),
    loanTime: z.string(),
    returnTime: z.string()
})

// los tipos de datos para validar cuando los traemos de la DB
export const LoanSchema = z.object({
    id: z.number(),
    userId: z.number(),
    loanDate: z.string(),
    returnDate: z.string(),
    loanTime: z.string(),
    returnTime: z.string(),
    isActive: z.boolean(),
    user: z.object({
        name: z.string(),
        lastName: z.string(),
        course: z.string(),
        role: z.string()
    }),
    books: z.array(z.object({
        title: z.string(),
        author: z.string(),
        publicationDate: z.string()
    }))
})

// construimos un arreglo porque es un arreglo lo que viene de la DB
export const LoansSchema = z.array(LoanSchema)

// este seria el type para inferir en las consultas por el ID por ejemplo
export type LoanType = z.infer<typeof LoanSchema>
export type DraftLoanType = z.infer<typeof DraftLoanSchema>