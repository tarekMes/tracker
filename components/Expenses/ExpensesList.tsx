import React from 'react'
import { View, Text, StyleSheet, FlatList } from "react-native";
import Expense from '../../models/Expense';
import ExpenseItem from './ExpenseItem';

export type props = {
    expenses: Expense[]
}

const renderExpenseItem = (itemData: any) => {
    return <ExpenseItem expense={itemData.item} />
}

const ExpensesList: React.FC<props> = ({expenses }) => {
    return <View>
        <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} style={ styles.list } />
    </View>
}

const styles = StyleSheet.create({
    list: {
        
    }
})

export default ExpensesList