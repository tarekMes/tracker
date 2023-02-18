import React from 'react'
import { View, Text, Pressable, StyleSheet, ImageComponent } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { GlobalStyles } from '../../util/styles';


class IconInput {
    name?: keyof typeof Ionicons.glyphMap;
    size: number
    color: string 
    constructor(name: keyof typeof Ionicons.glyphMap, size: number, color: string) {
        this.name = name
        this.size = size
        this.color = color
    }
}


export type props = {
    icon: IconInput,
    onPress: any
}

const IconButton: React.FC<props> = ({ icon, onPress }) => {
    console.log('type',  typeof  Ionicons.glyphMap);

    return <View>
        <Pressable style={({pressed})=> pressed ? styles.pressed : null} onPress={onPress}>
            <View  style={styles.buttonContainer}>
                <Ionicons name={icon?.name} size={icon.size} color={icon.color}/>
            </View>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 16,
        backgroundColor: GlobalStyles.colors.primary50
    },
    pressed: {
        opacity: .75
    }
})

export default IconButton