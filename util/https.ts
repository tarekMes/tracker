import axios from "axios"
import Expense from "../models/Expense"

const URI =  '/expenses.json'; // firebase URI + /expenses.json
const BASE_URI = '' // firebase URI

export const storeExpense = async (expenseDAta: Expense) => {
    const response = await axios.post(URI, expenseDAta)
    const id = response.data.name;
    return id
}

export const  fetchExpenses = async () => {
    const response = await axios.get(URI)
    const expenses = []
    for (const key in response.data) {
        const expenseObject = {
            id: key,
            amount: response.data[key].amount,
            description: response.data[key].description,
            date: new Date(response.data[key].date) 
        }
        expenses.push(expenseObject)
    }  
    return expenses
}

export const updateExpense = async (id :string, expenseData : Expense) => {
 return await axios.put(BASE_URI + `/expenses/${id}.json`, expenseData )
}

export const deleteExpense = async (id: string) => {
   return await axios.delete(BASE_URI + `/expenses/${id}.json`)
}