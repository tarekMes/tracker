import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ExpensesOutput from '../components/Expenses/ExpensesOutput'

import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'

export type props = {
    
}

const RecentExpenses: React.FC<props> = ({ }) => {
    const expensesCTX = React.useContext(ExpensesContext)

    const recentExpenses = expensesCTX.expenses.filter(e => {
        const today = new Date()
        const date7Days = getDateMinusDays(today, 7)
        return e.date > date7Days && e.date <= today
    })

    return (
        <View>
           <ExpensesOutput expenses={recentExpenses} expensesPeriode='last 7 days' fallBackText="No Expenses Registred for the last 7 days"/>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RecentExpenses