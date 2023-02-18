import  React from "react";
import { DUMMY_EXPENSES } from "../data/data";
import Expense from "../models/Expense";
import { fetchExpenses } from "../util/https";


// export type contextType = {
//     expenses:Expense[],
//     addExpense: any,
//     deleteExpense: any,
//     updateExpense: any,
//     id: string,
//     expenseData: Expense | undefined
// }

export type contextType = {
    expenses: Expense[],
    addExpense: Function,
    deleteExpense: Function,
    updateExpense: Function,
    setExpenses: Function
}

export const ExpensesContext = React.createContext<contextType>({
    expenses: [],
    addExpense: (expenseData: Expense) => {},
    deleteExpense: (id: string) => {},
    updateExpense: (id: string, expenseData: Expense) => { },
    setExpenses: (expenses: Expense[]) => {}
})


export type props = {
    children: JSX.Element
}

const expensesReducer = (state: Expense[], action :any) => {
    switch (action.type) {
        case 'ADD':
            // const id =  new Date().toString() + Math.random().toString
            return [ action.playload , ...state]
        
        case 'UPDATE':
            console.log('EDIT');
            const updatableExpenseIndex = state.findIndex(
                (expense: Expense) => expense.id === action.playload.id
            )
            console.log('EDIT 2' , updatableExpenseIndex, action.playload.expenseData);
            const UpdatableExpense = state[updatableExpenseIndex]
            const updatedItem = { ...UpdatableExpense, ...action.playload.expenseData }
            console.log('EDIT 3' , updatedItem);
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            console.log('EDIT 4' , updatedExpenses);
            return updatedExpenses
        case 'DELETE':
            console.log(state.filter( e => e.id !== action.playload));
            
            return state.filter( e => e.id !== action.playload)
        case 'SET':
            const inverted = action.playload.reverse()
            return  inverted
    
        default:
            return state
    }
}

export const ExpensesContextProvider: React.FC<props> = ({ children }) => {
   
    

    const [expensesState, dispatch] = React.useReducer(expensesReducer, [])
    
    const addExpense = (expenseData : Expense ) => {
        dispatch({type: 'ADD', playload: expenseData})
    }
    const deleteExpense = (id : string ) => {
        dispatch({type: 'DELETE', playload: id})
    }
    const updateExpense = (id : string, expenseData: Expense ) => {
        dispatch({type: 'UPDATE', playload: {id, expenseData}})
    }
    const setExpenses = ( expensesData: Expense[] ) => {
        dispatch({type: 'SET', playload: expensesData })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    }

    return <ExpensesContext.Provider value={value} >
        {children}
    </ExpensesContext.Provider>


}

export default ExpensesContextProvider