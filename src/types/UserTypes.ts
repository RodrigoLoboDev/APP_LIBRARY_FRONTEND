import { z } from 'zod'

// los tipos de datos que envia el formulario via action
export type Data = {
    [k: string]: FormDataEntryValue;
}

// los tipos de datos para validar lo que enviar el usuario por el formulario
export const DraftUserSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    course: z.string(),
    role: z.string()
})

// los tipos de datos para validar cuando los traemos de la DB
export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastName: z.string(),
    course: z.string(),
    role: z.string()
})

// construimos un arreglo porque es un arreglo lo que viene de la DB
export const UsersSchema = z.array(UserSchema)

// este seria el type para inferir en las consultas por el ID por ejemplo
export type UserType = z.infer<typeof UserSchema>