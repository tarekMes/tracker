import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Input from './Input'
import { GlobalStyles } from '../../util/styles'
import PrimaryButton from '../UI/PrimaryButton'
import Expense from '../../models/Expense'
import { getFormattedIso } from '../../util/date'

export type props = {
    onSubmit: any,
    onCancel: any,
    submitLabelButton: string,
    defaultValues: Expense | undefined
}

export type expenseInput = {
    amount: {
        value: string,
        isValid: boolean
    },
    date:  {
        value: string,
        isValid: boolean
    },
    description:  {
        value: string,
        isValid: boolean
    },    
}

const ExpenseForm: React.FC<props> = ({ onSubmit, onCancel, submitLabelButton, defaultValues }) => {
    
    const [inputs, setInputs] = React.useState<expenseInput>({
        
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid : true
        },
        date: {
            value: defaultValues ? getFormattedIso(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    })


    
    
    const inputChangeHandler = (identifier: string, value: string) => {
        setInputs(curr => {
            return {
                ...curr,
                [identifier]: {value: value, isValid: true}
            }
        })
    }

    

    const submitHandler = () => {
        
        const expenseData = new Expense('', inputs.description.value, +inputs.amount.value, inputs.date.value)
        
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        console.log(dateIsValid, expenseData.date.toString() );
        
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (amountIsValid && dateIsValid && descriptionIsValid) {
            onSubmit(expenseData)
        } else {

            setInputs(curr  => {
                return {
                    amount : {value: curr.amount.value, isValid: amountIsValid},
                    date : {value: curr.date.value, isValid: dateIsValid},
                    description : {value: curr.description.value, isValid: descriptionIsValid}
                }
            })

            // Alert.alert('Invalid Input')
        }

            
    }

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.description.isValid ||
        !inputs.date.isValid 

    return <View style={styles.form}>
        <Text style={styles.title}>Expense</Text>
        <View style={styles.inputsRow}>

            <Input label='amount' style={styles.rowInput}
                invalid= {!inputs.amount.isValid}
                inputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value
            }} />

            <Input label='date' style={styles.rowInput}
                invalid= {!inputs.date.isValid}
                inputConfig={{
                maxLength: 10,
                placeholder: 'YYYY-MM-DD',
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            }}/>
        </View>
        
       
        <Input label='description'
            invalid= {!inputs.description.isValid}
            style={{}} inputConfig={{
            multiline: true,
            autoCorrect: true,
            autoCapitalize: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
        }} />
        
        {formIsInvalid &&
            <View style={styles.errorContainer}>
                 <Text style={styles.errorText}>Invalid Input</Text>
            </View>
        }

        <View style={styles.buttonsContainer}>
                <PrimaryButton style={styles.button} onPress={onCancel} mode='flat'>
                    Cancel
                </PrimaryButton>
                <PrimaryButton style={styles.button} onPress={submitHandler} mode='primary'>
                    { submitLabelButton } </PrimaryButton>
        </View>

    </View>
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 36
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary800,
        textAlign: 'center',
        marginVertical: 24
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex:1
    },
     buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorContainer: {
        backgroundColor: GlobalStyles.colors.error50,
        marginVertical: 26,
        padding: 24,
        borderRadius: 6,
        textAlign: 'center'
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default ExpenseForm