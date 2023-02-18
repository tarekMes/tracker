import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../util/styles'
import PrimaryButton from '../components/UI/PrimaryButton'
import { ExpensesContext } from '../store/expenses-context'
import Expense from '../models/Expense'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updateExpense } from '../util/https'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

export type props = {
    navigation: any
    route: any
}

const ManageExpenses: React.FC<props> = ({ navigation, route }) => {
    const [err, setErr] = React.useState<Boolean>(false)
    const [isLoading, setIsLoading ] = React.useState<Boolean>(false)

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
                    setIsLoading(true)

        deleteExpense(editedExpenseId).then(() => {
            expensesCTX.deleteExpense(editedExpenseId)
            navigation.goBack()
             setIsLoading(false)
        }).catch(() => {
            setErr(true)
        })
        
    }
    const cancelHandler = () => {
        navigation.goBack()
    }
    const confirmHandler = async (expenseData: Expense) => {
        if (isEditing) {
            setIsLoading(true)

            console.log('confirmHandler EDIT');
            updateExpense(editedExpenseId, expenseData).then(() => {
                expensesCTX.updateExpense(editedExpenseId, expenseData)
                setIsLoading(false)
                 navigation.goBack()
            }).catch(() => {
            setErr(true)
            })
            
        } else {
            setIsLoading(true)
            console.log('confirmHandler ADD');
            const id = await storeExpense(expenseData).then(() => {
            expensesCTX.addExpense({ ...expenseData, id })
            setIsLoading(false)
            navigation.goBack()
            }).catch(() => {
            setErr(true)
            })
            
        }
       
    }
    if (err) {
      return  <ErrorOverlay message="there's an problem try later " onPress={cancelHandler}/>
    }
    if (isLoading) {
       return <LoadingOverlay />
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