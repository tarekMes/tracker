import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { GlobalStyles } from "../../util/styles";


export type props = {

}

const LoadingOverlay: React.FC<props> = ({ }) => {
    return <View style={styles.container} >
        <ActivityIndicator size={"large"} color={GlobalStyles.colors.primary500} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    }
})
export default LoadingOverlay