export const getFormatted = (date: Date) => {
    return `${ date.getFullYear() }-${ date.getMonth()+1 }-${ date.getDay() }`
}
export const getFormattedIso = (date: Date) => {
    return date.toISOString().split('T', 1)[0]
}

export const getDateMinusDays = (date: Date, days:number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}