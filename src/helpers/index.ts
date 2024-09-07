export const nowDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


export const nowTime = () => {
    // Obtener la fecha y hora actual del sistema
    const currentDate = new Date();
    return currentDate.toTimeString().split(' ')[0]; // HH:MM:SS
}