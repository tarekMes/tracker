import React from 'react'
import { View, StyleSheet, Text } from "react-native";
import Expense from '../../models/Expense';
import { GlobalStyles } from '../../util/styles';

export type props = {
    periodeName: string,
    expenses: Expense[]
}


const ExpensesSummary: React.FC<props> = ({ periodeName, expenses }) => {

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount 
    }, 0)

    return  <View style={styles.container}>
        <Text style={styles.periodeText} >{periodeName}</Text>
        <Text style={styles.sumText} >${ expensesSum.toFixed(2) }</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        // width: '80%',
    },
    periodeText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sumText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: GlobalStyles.colors.primary500
    }
})

export default ExpensesSummary

