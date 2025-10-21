import React from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.titleHeader}>Historial de busquedas</Text>
            <Pressable 
                style={({pressed}) => [
                    styles.btnClearHistory, 
                    {backgroundColor: pressed ? '#ffffff' : '#f0f0f0bd',}
                ]}>
                <Text>
                    Limpiar historial
                </Text>
            </Pressable>
        </View>
    )
}

export const SearchHistory = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Header />
                <KeyboardAvoidingView
                   
                    style={{ flex: 1 }}
                >
                        
                    <ScrollView>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                        <Text>WWWWWWWWWW</Text>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    content: {
        width: getWidthPercentage(95),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    titleHeader: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
    },
    btnClearHistory: {
        paddingHorizontal: isTablet ? 30 : 20,
        paddingVertical: 8,
        borderRadius: 10
    }
});