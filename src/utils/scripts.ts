export const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = diffTime / (1000 * 60 * 60);
    
    if (diffHours < 0.016) {
        return `Hace ${Math.floor(diffHours * 60 * 60)} segundos`;
    }
    else if (diffHours <= 1) {
        return `Hace ${Math.floor(diffHours * 60)} minutos`;
    }
    else if (diffHours < 24) {
        return `Hace ${Math.floor(diffHours)} horas`;
    }
    else {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
    }
}
