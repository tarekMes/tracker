import React from "react";
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from "../../util/styles";
import PrimaryButton from "./PrimaryButton";


export type props = {
    message: string,
    onPress: Function
}

const ErrorOverlay: React.FC<props> = ({message, onPress }) => {
    return <View style={styles.container} >
        <Text style={styles.errorTitle}>An Error Occured!</Text>
        <Text style={styles.errorText}>{message}</Text>
        <PrimaryButton mode='normal' style={{}} onPress={onPress}>OKAY</PrimaryButton>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.error50
    },
    errorTitle: {
        color: GlobalStyles.colors.error500,
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 24,
        paddingHorizontal: 24
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        fontSize: 12,
        marginHorizontal: 24,
        paddingHorizontal: 24
    }
})
export default ErrorOverlay