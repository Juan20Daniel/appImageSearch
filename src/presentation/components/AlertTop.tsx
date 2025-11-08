import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
    message: string;
    opacity: Animated.Value;
    onClose: () => void;
}

export const AlertTop = ({message, opacity, onClose}:Props) => {
    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.content,
                    {opacity: opacity}
                ]}
            >
                <Text style={styles.message}>{message}</Text>
                <Pressable 
                    onPress={() => onClose()}
                    style={({pressed}) => [
                        styles.btnClose,
                        {opacity: pressed ? 0.6 : 1}
                    ]}
                >
                    <Ionicons name="close" size={20} color="#ffffffff" />
                </Pressable>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top:73,
        zIndex: 3,
    },
    content: {
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#b6b6b6ff',
        paddingLeft: 15,
        paddingRight: 5,
        paddingVertical: 5,
        borderRadius: 40,
    },
    message: {
        width: 200,
        fontSize: 16,
    },
    btnClose: {
        backgroundColor:'#8b8b8bff',
        padding: 5,
        borderRadius: '50%',
    }
});