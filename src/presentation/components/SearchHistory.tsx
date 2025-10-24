import React, { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { isTablet } from '../helpers/isTablet';
import { calcResolution } from '../helpers/calcResolutionDevice';
import { ItemHistory } from './ItemHistory';
import { History } from '../../domain/entities/historyEntity';

interface Props {
    heightKeyboard: number;
    heightInputSearch: number;
    history: History[];
}

interface HeaderProps {
    setHeightHeader: Dispatch<SetStateAction<number>>;
}

const Header = ({setHeightHeader}:HeaderProps) => {
    return (
        <View 
            style={styles.header} 
            onLayout={(e) => {
                const { height } = e.nativeEvent.layout;
                setHeightHeader(height);
            }}
        >
            <Text style={styles.titleHeader}>Historial de busquedas</Text>
            <Pressable 
                style={({pressed}) => [
                    styles.btnClearHistory, 
                    {backgroundColor: pressed ? '#ffffff' : '#f0f0f0bd',}
                ]}>
                <Text style={styles.textBtnClearHistory}>
                    Limpiar historial
                </Text>
            </Pressable>
        </View>
    );
}

export const SearchHistory = ({heightKeyboard, heightInputSearch, history}:Props) => {
    const [ heightHeader, setHeightHeader ] = useState(0);
    const height = useWindowDimensions().height;
    return (
        <View style={{
            ...styles.container, 
            height: height-heightInputSearch-heightKeyboard
        }}>
            <View style={styles.content}>
                <Header setHeightHeader={setHeightHeader} />
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{height: height-heightInputSearch-heightKeyboard-heightHeader-80}} 
                    keyboardShouldPersistTaps="always"
                >
                    {history.map((item, index) => (
                        <ItemHistory key={index} />
                    ))}
                    <View style={{width: 'auto', height: 80}} />
                </ScrollView>
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
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    titleHeader: {
        fontFamily: 'Roboto-Bold',
        fontSize: Number(calcResolution({low: 10, medium: isTablet ? 20 : 16, high: 20})),
    },
    btnClearHistory: {
        paddingHorizontal: isTablet ? 30 : 20,
        paddingVertical: 8,
        borderRadius: 10,
    },
    textBtnClearHistory: {
        fontSize: Number(calcResolution({low: 10, medium:isTablet ? 14 : 12}))
    }
});