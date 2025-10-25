import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { calcResolution } from '../helpers/calcResolutionDevice';
import { History } from '../../domain/entities/historyEntity';

interface Props {
    history:History;
}

export const ItemHistory = ({history}:Props) => {
    const handlePress = () => {
        console.log('exce');
    }
    return (
        <Pressable 
            onPress={() => handlePress()}
            style={({pressed}) => [
                styles.container,
                {backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : '#fff'}
            ]}
        >
            <View style={{flexDirection: 'row', gap: 10}}>
                <Ionicons 
                    name='reload-outline'
                    color='gray' 
                    size={Number(calcResolution({low: 15, medium:20, high: 25}))} 
                />
                <Text style={{color: 'gray'}}>
                    {/* {history.value} */}
                    WWWWWWW
                </Text> 
            </View>
            <Pressable 
                style={({pressed}) => [
                    {opacity: pressed ? 0.3 : 1}
                ]}
            >
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
        paddingHorizontal: 10, 
        paddingVertical: 8,
    }
});