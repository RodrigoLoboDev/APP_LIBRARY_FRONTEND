import axios from 'axios'
import {  } from '../types/BookTypes';
import { Data, DraftUserSchema, UserSchema, UsersSchema, UserType } from '../types/UserTypes';

export async function createUser (datos : Data) {
    // console.log(datos);    
    try {
        // Validamos que los datos que enviamos tiene el schema que definimos
        const result = DraftUserSchema.safeParse({
            ...datos
        })
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/users`
            await axios.post(url, result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getUsers() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/users`
        const { data } = await axios(url)
        
        // Validamos que los datos que recibimos son los que esperamos, filtramos tambien los datos necesarios unicamente
        const result = UsersSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function getUserById(id : UserType['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/users/${id}`
        const { data } = await axios(url)        
        
        // Validamos que los datos que recibimos son los que esperamos, filtramos tambien los datos necesarios unicamente
        const result = UserSchema.safeParse(data)
        
        if (result.success) {
            return result.data
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser (datos : Data, id : UserType['id']) {
    // console.log(datos);    
    // console.log(Boolean(+datos.availability));
    
    try {
        // Validamos que los datos que enviamos tiene el schema que definimos
        const result = UserSchema.safeParse({
            ...datos,
            id: id
        })
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/users/${id}`
            // console.log(result.data);
            await axios.put(url, result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(id: UserType['id']) {    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/users/${id}`
        await axios.delete(url)
    } catch (error) {
        throw new Error("Este Usuario tiene Prestamos y no puede ser Eliminado");
    }
}