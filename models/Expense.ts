class Expense {
    id: string
    description: string
    amount: number
    date: Date

    constructor(description: string, amount: number, date: string) {
        this.id = new Date().getTime().toString() + Math.random().toString()
        this.description = description
        this.amount = amount 
        this.date =  date ? new Date(date) : new Date()
    }
    
}

export default Expense