import React from 'react'
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from '../../util/styles';


export type props = {
    label: string,
    inputConfig: any,
    style: any,
    invalid: boolean
}

const Input: React.FC<props> = ({ label, inputConfig, style, invalid}) => {
    return <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.ivalidLabel]}>{label}</Text>
        <TextInput {...inputConfig} style={[styles.input , inputConfig?.multiline && styles.inputMultiline, invalid && styles.invalidInput]} />
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical:8,
        
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
        marginBottom: 8
    },
    input: {
        backgroundColor: 'white',
        fontSize: 16,
        padding: 6,
        borderRadius: 6,
        color: GlobalStyles.colors.primary400,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    ivalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        borderWidth: 1,
        borderColor: GlobalStyles.colors.error500
    }

})

export default Input