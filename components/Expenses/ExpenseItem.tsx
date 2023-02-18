import React from 'react'
import { View, Text, StyleSheet, Pressable } from "react-native";
import Expense from '../../models/Expense';
import { GlobalStyles } from '../../util/styles';
import { getFormatted, getFormattedIso } from '../../util/date';

import {useNavigation} from '@react-navigation/native'

export type props = {
    expense: Expense
}


const ExpenseItem: React.FC<props> = ({ expense }) => {

    const navigation = useNavigation()

    const expensePressHandler = () => {
        navigation.navigate('ManageExpenses', {expenseId: expense.id})
    }

    return <Pressable android_ripple={{color: GlobalStyles.colors.primary400}} key={expense.id} style={styles.expenseItem} onPress={expensePressHandler}>
        <View>
            <Text style={[styles.textBase ,styles.description]}>{expense.description}</Text>
            <Text style={[styles.textBase]}>{getFormattedIso(expense.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
            <Text style={styles.amountText}>${expense.amount.toFixed(2)}</Text>
        </View>   
    </Pressable>
}

const styles = StyleSheet.create({
    expenseItem: {
        backgroundColor: 'white',
        padding: 12,
        marginVertical: 8,
        elevation:3,
        flexDirection: 'row',
        borderRadius: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'
    },
    textBase: {
        color: GlobalStyles.colors.primary400
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.primary700,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    amountText: {
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary50,
        textAlign: 'center',
        fontSize: 16
    }
})

export default ExpenseItem