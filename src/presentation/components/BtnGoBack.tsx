import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, Pressable } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigation';

export const BtnGoBack = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <Pressable 
            onPress={() => navigation.navigate('Home')} 
            style={({pressed}) => [{
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1
            }]}
        >
            <Image 
                source={require('../../../assets/iconBack.png')}
                style={{width: 30, height: 20}}
            />
        </Pressable>      
    );
}