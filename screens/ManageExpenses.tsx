import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../util/styles'
import PrimaryButton from '../components/UI/PrimaryButton'
import { ExpensesContext } from '../store/expenses-context'
import Expense from '../models/Expense'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'

export type props = {
    navigation: any
    route: any
}

const ManageExpenses: React.FC<props> = ({navigation, route }) => {
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const expensesCTX = React.useContext(ExpensesContext)

    const selectedExpense = expensesCTX.expenses.find(
        expense => {
            return expense.id === editedExpenseId
        }
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
         }) 
    }, [navigation, isEditing])
    
    const DeleteHandler = () => {        
        expensesCTX.deleteExpense(editedExpenseId)
        navigation.goBack()
    }
    const cancelHandler = () => {
        navigation.goBack()
    }
    const confirmHandler = (expenseData: Expense) => {
        if (isEditing) {
            console.log('confirmHandler EDIT');
            
            expensesCTX.updateExpense(editedExpenseId, expenseData)
        } else {
            console.log('confirmHandler ADD');
            expensesCTX.addExpense(expenseData)
        }
        navigation.goBack()
    }

    return (
        <View style={styles.screen}>

            <ExpenseForm onSubmit={confirmHandler}
                onCancel={cancelHandler}
                submitLabelButton={isEditing ? 'Update' : 'Add'}
                defaultValues= {selectedExpense}
            />

            

            <View style={styles.DeleteContainer}>
                {isEditing && <IconButton icon={{
                name: 'trash',
                size: 28,
                color: GlobalStyles.colors.primary800
            }}
            onPress={DeleteHandler}/>}
            </View>

            

            <View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        
    },
    DeleteContainer: {
        width : 80
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})

export default ManageExpenses