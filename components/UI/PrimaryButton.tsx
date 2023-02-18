import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { GlobalStyles } from '../../util/styles'

export type props = {
    onPress: any,
    children: any,
    mode: string,
    style: any
}

const PrimaryButton: React.FC<props> = ({onPress, children, mode, style}) => {
    return <View style={ [{overflow: 'hidden'} , style]} >
        <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
            <View style={[styles.button, mode == 'flat' && styles.flat, style]} >
                <Text style={[styles.buttonText, mode == 'flat' && styles.flatText]} >{ children }</Text>
            </View>
        </Pressable>        
    </View>
    
}


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderWidth: 0,
    },
    flat: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary500
    },
    buttonText: {
        color: GlobalStyles.colors.primary50
    },
    flatText: {
        color: GlobalStyles.colors.primary500
    },
    pressed: {
        opacity: .5,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
        // overflow: 'hidden'
    }
})


export default PrimaryButton