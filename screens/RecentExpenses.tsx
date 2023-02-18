import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import ExpensesOutput from '../components/Expenses/ExpensesOutput'

import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/https'
import Expense from '../models/Expense'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

export type props = {
    
}

const RecentExpenses: React.FC<props> = ({ }) => {
    const expensesCTX = React.useContext(ExpensesContext)
    const [isFetching, setisFetching] = React.useState<Boolean>(true)
    const [err, setErr] = React.useState<Boolean>(false)
    
    React.useEffect(() => {
        const getExpences = async () => {
            setisFetching(true)
            try {
                const expenses = await fetchExpenses()
                expensesCTX.setExpenses(expenses)
                setisFetching(false)
            } catch (error) {
                setErr(true)
            }
           
        }
        getExpences()
    }, []);
    console.log('after use effect', expensesCTX.expenses);
    
    const recentExpenses = expensesCTX.expenses.filter(e => {
        const today = new Date()
        const date7Days = getDateMinusDays(today, 7)
        return e.date > date7Days && e.date <= today
    })
    console.log('after filter', recentExpenses);

    if (err) {
      return  <ErrorOverlay message="there's an problem try later " onPress={()=>{Alert.alert('Thansk for using Our app')}}/>
    }

    return (
        <View>
            {isFetching && <LoadingOverlay />}
            {!isFetching && <ExpensesOutput expenses={recentExpenses} expensesPeriode='last 7 days' fallBackText="No Expenses Registred for the last 7 days"/>}          
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RecentExpenses