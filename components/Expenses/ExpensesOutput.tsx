import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import Expense from '../../models/Expense'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../util/styles'

export type props = {
    expenses: Expense[],
    expensesPeriode: string,
    fallBackText: string
}



const ExpensesOutput: React.FC<props> = ({ expenses, expensesPeriode, fallBackText }) => {
    let content = <Text style={styles.infoText}>
        {fallBackText}
    </Text>

    if (expenses.length>0) {
        content = <ExpensesList expenses={expenses}/>
    } 

    return <View style={styles.container}>
       <ExpensesSummary expenses={expenses} periodeName={expensesPeriode} />
       {content}
    </View>
}

const styles = StyleSheet.create({
    container: {
        
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom:0
    },
    infoText: {
        color: GlobalStyles.colors.primary700,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})

export default ExpensesOutput