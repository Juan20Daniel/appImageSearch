import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { calcResolution } from '../helpers/calcResolutionDevice';

export const ItemHistory = () => {
    return (
        <Pressable style={styles.container}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <Ionicons 
                    name='reload-outline'
                    color='gray' 
                    size={Number(calcResolution({low: 15, medium:20, high: 25}))} 
                />
                <Text style={{color: 'gray'}}>
                    Autos de 1239
                </Text> 
            </View>
            <Pressable>
                <Ionicons 
                    name='close-outline' 
                    size={Number(calcResolution({low: 15, medium:20, high: 25}))} 
                />
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent:'space-between', 
        paddingHorizontal: 5, 
        paddingVertical: 8
    }
});