import axios from 'axios'
import { DraftLoanSchema, DraftLoanType, LoanSchema, LoansSchema, LoanType } from '../types/LoanTypes';


export async function createLoan (datos : DraftLoanType) {
    // console.log(datos);    
    try {
        // Validamos que los datos que enviamos tiene el schema que definimos
        const result = DraftLoanSchema.safeParse(datos)        
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/loans`
            await axios.post(url, result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getLoans() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/loans`
        const { data } = await axios(url)        
        
        // Validamos que los datos que recibimos son los que esperamos, filtramos tambien los datos necesarios unicamente
        const result = LoansSchema.safeParse(data)
        
        if (result.success) {
            return result.data
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function getLoanById(id : LoanType['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/loans/${id}`
        const { data } = await axios(url)        
        
        // Validamos que los datos que recibimos son los que esperamos, filtramos tambien los datos necesarios unicamente
        const result = LoanSchema.safeParse(data.data)
        
        if (result.success) {
            return result.data
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function updateLoans (datos : DraftLoanType, id : LoanType['id']) {
    // console.log(datos);    
    // console.log(Boolean(+datos.availability));
    
    try {
        // Validamos que los datos que enviamos tiene el schema que definimos
        const result = LoanSchema.safeParse({
            ...datos,
            id: id
        })
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/loans/${id}`
            // console.log(result.data);
            await axios.put(url, result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

export async function deleteLoans(id: LoanType['id']) {    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/loans/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error);
    }
}

export async function updateIsActive(id: LoanType['id']) {  
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/loans/${id}`
        await axios.patch(url)
    } catch (error) {
        throw new Error("Este préstamo ya ha sido devuelto y no puede ser modificado");
    }
}