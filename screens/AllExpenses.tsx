import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


import ExpensesOutput from '../components/Expenses/ExpensesOutput'
import { DUMMY_EXPENSES } from '../data/data'
import { ExpensesContext } from '../store/expenses-context'


export type props = {
    
}

const AllExpenses: React.FC<props> = ({ }) => {
    const expensesCTX =  React.useContext(ExpensesContext)
    return (
        <View>
            <ExpensesOutput expenses={expensesCTX.expenses } expensesPeriode='last 7 days' fallBackText="No Expenses Registred for the last 7 days"/>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default AllExpenses